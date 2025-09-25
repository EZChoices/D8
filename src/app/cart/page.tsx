"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { beginCheckout, viewCart } from "@/lib/ga";
import { useEffect, useMemo, useState } from "react";
import { useShipping } from "@/components/ShippingContext";
import { STATE_CODES, getStateRule } from "@/data/stateRules";
import { getProduct, formatPrice } from "@/data/products";
import { useWholesale } from "@/components/WholesaleContext";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";
import QuoteDrawer from "@/components/QuoteDrawer";
import type { QuoteItem } from "@/types/quote";
import type { PackUnit, ProductCategory } from "@/types/product";
import { track } from "@/lib/analytics";

function inferPackUnit(label: string | undefined): { pack: string; unit: PackUnit } {
  if (!label) return { pack: "each", unit: "ea" };
  const lower = label.toLowerCase();
  if (lower.endsWith("g")) return { pack: label, unit: "g" };
  if (lower.endsWith("oz")) return { pack: label, unit: "oz" };
  if (lower.endsWith("lb") || lower.includes("pound")) return { pack: label, unit: "lb" };
  if (lower.includes("ml")) return { pack: label, unit: "ml" };
  if (lower.includes("half pound") || lower.includes("half-pound")) return { pack: label, unit: "hp" };
  if (lower.includes("quarter pound") || lower.includes("quarter-pound")) return { pack: label, unit: "qp" };
  return { pack: label, unit: "ea" };
}

function mapComplianceToCategory(productCategory: string, tags: string[] | undefined): ProductCategory {
  const lowerCategory = productCategory.toLowerCase();
  const set = new Set((tags || []).map((tag) => tag.toLowerCase()));
  if (set.has("flower") || lowerCategory.includes("flower")) return "flower";
  if (set.has("pre-roll")) return "pre-rolls";
  if (set.has("extract") || lowerCategory.includes("concentrate")) return "concentrates";
  if (lowerCategory.includes("distillate")) return "distillates";
  if (set.has("hardware") || lowerCategory.includes("hardware")) return "hardware";
  if (set.has("topical") || lowerCategory.includes("topical")) return "topicals";
  if (set.has("beverage") || lowerCategory.includes("beverage")) return "beverages";
  if (set.has("edible") || lowerCategory.includes("edible") || lowerCategory.includes("gummy")) return "edibles";
  if (set.has("ingestible")) return "ingestibles";
  if (set.has("inhalable") || lowerCategory.includes("vape")) return "vapes";
  return "services";
}

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const { state, setState } = useShipping();
  const { status } = useWholesale();
  const [quoteOpen, setQuoteOpen] = useState(false);
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
  const quoteItems = useMemo(() => {
    return enriched.map((line) => {
      const product = line.product;
      const baseLabel = product?.size_label || product?.case_pack || "each";
      const { pack, unit } = inferPackUnit(baseLabel);
      const category = product
        ? mapComplianceToCategory(product.category, product.compliance_tags)
        : "services";
      const item: QuoteItem = {
        productId: line.slug,
        name: line.title,
        category,
        pack,
        unit,
        quantity: line.quantity
      };
      if (product?.price_cents) {
        item.priceUSD = Number((product.price_cents / 100).toFixed(2));
      } else {
        item.priceUSD = Number((line.price_cents / 100).toFixed(2));
      }
      return item;
    });
  }, [enriched]);

  useEffect(() => {
    viewCart(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canRequestQuote = Boolean(state) && blocked.length === 0 && items.length > 0;

  const openQuoteDrawer = () => {
    if (!canRequestQuote) return;
    beginCheckout(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    track("quote_drawer_opened", { items: items.length, state });
    setQuoteOpen(true);
  };

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
            <button
              type="button"
              onClick={openQuoteDrawer}
              className={`mt-3 inline-flex items-center justify-center rounded px-4 py-2 text-sm font-semibold text-white ${
                canRequestQuote ? "bg-black" : "bg-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={!canRequestQuote}
              disabled={!canRequestQuote}
            >
              Request wholesale quote
            </button>
            {!canRequestQuote && (
              <p className="text-xs text-red-700">
                Select a compliant state and resolve restricted items to enable quote submission.
              </p>
            )}
          </div>
        </div>
      )}
      <QuoteDrawer
        key={quoteItems.map((i) => `${i.productId}:${i.quantity}`).join("|")}
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialItems={quoteItems}
        userIsWholesaleVerified={status === "approved"}
        initialShippingState={state}
      />
    </section>
  );
}
