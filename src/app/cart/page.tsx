"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { beginCheckout, viewCart } from "@/lib/ga";
import { useEffect, useMemo } from "react";
import { useShipping } from "@/components/ShippingContext";
import { STATE_CODES, getStateRule } from "@/data/stateRules";
import { getProduct, formatPrice } from "@/data/products";
import { useWholesale } from "@/components/WholesaleContext";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const { state, setState } = useShipping();
  const { status } = useWholesale();
  const enriched = useMemo(() => {
    return items.map((item) => {
      const product = getProduct(item.slug);
      const gate = product
        ? evaluatePurchaseGate(product, { state, wholesaleStatus: status })
        : { canPurchase: true, requiresWholesale: false, restrictedByState: false, messages: [] };
      return { ...item, product, gate };
    });
  }, [items, state, status]);

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
  const blocked = enriched.filter((line) => !line.gate.canPurchase);

  useEffect(() => {
    viewCart(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canRequestQuote = Boolean(state) && blocked.length === 0 && items.length > 0;

  return (
    <section className="section space-y-6">
      <header className="space-y-2">
        <h1>Cart</h1>
        <p className="text-sm text-gray-600">
          Cart totals reflect list pricing. Final wholesale invoices include negotiated freight and compliance review.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        <label className="text-sm" htmlFor="cart-state-selector">
          Ship to
        </label>
        <select
          id="cart-state-selector"
          value={state || ""}
          onChange={(e) => setState(e.target.value || null)}
          className="rounded border px-2 py-1"
        >
          <option value="">Select state…</option>
          {STATE_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        {state ? (
          <span className="text-xs text-gray-600">
            {getStateRule(state).reason}
          </span>
        ) : (
          <span className="text-xs text-red-700">Select a destination for compliance review.</span>
        )}
      </div>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/shop" className="underline">Browse the catalog</Link>.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse" role="table">
              <caption className="sr-only">Items pending wholesale quote</caption>
              <thead>
                <tr>
                  <th className="p-2 text-left text-sm font-semibold">Item</th>
                  <th className="p-2 text-left text-sm font-semibold">Qty</th>
                  <th className="p-2 text-left text-sm font-semibold">Unit price</th>
                  <th className="p-2 text-left text-sm font-semibold">Subtotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((line) => (
                  <tr key={line.slug} className="border-t align-top">
                    <td className="p-2">
                      <div className="flex items-start gap-3">
                        {line.image && (
                          <span className="relative block h-12 w-12">
                            <ResponsiveImage src={line.image} alt={line.title} fill sizes="48px" className="object-contain" />
                          </span>
                        )}
                        <div className="text-sm">
                          <div className="font-medium">{line.title}</div>
                          {line.product?.case_pack ? (
                            <div className="text-xs text-gray-600">Case pack: {line.product.case_pack}</div>
                          ) : null}
                          {line.product?.moq_units ? (
                            <div className="text-xs text-gray-600">MOQ: {line.product.moq_units}</div>
                          ) : null}
                          {line.gate.messages.length > 0 && (
                            <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
                              {line.gate.messages.map((message) => (
                                <li key={message}>{message}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) => setQty(line.slug, Number(e.target.value))}
                        className="w-20 rounded border px-2 py-1"
                        aria-label={`Update quantity for ${line.title}`}
                      />
                    </td>
                    <td className="p-2 text-sm">{formatPrice(line.price_cents)}</td>
                    <td className="p-2 text-sm">{formatPrice(line.price_cents * line.quantity)}</td>
                    <td className="p-2 text-right text-xs">
                      <button onClick={() => remove(line.slug)} className="underline">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t pt-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Lines</span>
              <span>{count}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>Estimated subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-600">
              Freight and insurance are quoted after compliance approval. Palletized orders may require deposits.
            </p>
            {blocked.length > 0 && (
              <div className="rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                Resolve compliance holds before submitting a quote request.
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/shop" className="rounded border px-4 py-2 text-sm">
                Continue shopping
              </Link>
              <button onClick={clear} className="text-sm underline" type="button">
                Clear cart
              </button>
            </div>
            <Link
              href={canRequestQuote ? "/checkout" : "#"}
              aria-disabled={!canRequestQuote}
              onClick={() => {
                if (!canRequestQuote) return;
                beginCheckout(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
              }}
              className={`mt-3 inline-flex items-center justify-center rounded px-4 py-2 text-sm font-semibold text-white ${
                canRequestQuote ? "bg-black" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Request wholesale quote
            </Link>
            {!canRequestQuote && (
              <p className="text-xs text-red-700">
                Select a compliant state and resolve restricted items to enable quote submission.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
