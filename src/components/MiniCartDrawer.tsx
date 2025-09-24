"use client";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useCart } from "@/components/CartContext";
import { beginCheckout, viewCart } from "@/lib/ga";
import { useEffect, useMemo } from "react";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { getProduct, formatPrice } from "@/data/products";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function MiniCartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, total_cents } = useCart();
  const { state } = useShipping();
  const { status } = useWholesale();
  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const enriched = useMemo(() => {
    return items.map((item) => {
      const product = getProduct(item.slug);
      const gate = product
        ? evaluatePurchaseGate(product, { state, wholesaleStatus: status })
        : { canPurchase: true, requiresWholesale: false, restrictedByState: false, messages: [] };
      return { ...item, gate };
    });
  }, [items, state, status]);
  const hasBlocks = enriched.some((line) => !line.gate.canPurchase);

  if (!open) return null;
  useEffect(() => {
    if (!open) return;
    viewCart(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const handleBegin = () => {
    if (hasBlocks) return;
    beginCheckout(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[1100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <aside
        className="absolute right-0 top-0 h-full w-[92vw] max-w-[420px] overflow-y-auto bg-white p-4"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mini cart"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cart ({count})</h2>
          <button aria-label="Close" onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">
            Your cart is empty. <Link href="/shop" className="underline">Browse products</Link>.
          </p>
        ) : (
          <div className="space-y-3">
            {enriched.map((i) => (
              <div key={i.slug} className="flex items-center gap-3 border-b pb-3">
                {i.image && (
                  <span className="relative block h-12 w-12">
                    <ResponsiveImage src={i.image} alt={i.title} fill sizes="48px" className="object-contain" />
                  </span>
                )}
                <div className="flex-1 text-sm">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-gray-600">{formatPrice(i.price_cents)}</div>
                  {i.gate.messages.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
                      {i.gate.messages.map((message) => (
                        <li key={message}>{message}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <button className="rounded border px-2" onClick={() => setQty(i.slug, Math.max(1, i.quantity - 1))} aria-label="Decrease">
                      −
                    </button>
                    <span>{i.quantity}</span>
                    <button className="rounded border px-2" onClick={() => setQty(i.slug, i.quantity + 1)} aria-label="Increase">
                      +
                    </button>
                    <button className="ml-2 text-xs underline" onClick={() => remove(i.slug)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 text-sm">
              <div>Estimated subtotal</div>
              <div className="text-base font-semibold">{formatPrice(total_cents)}</div>
            </div>
            {hasBlocks && (
              <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                Resolve compliance holds before requesting a quote.
              </div>
            )}
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1 rounded border px-4 py-2 text-center">View cart</Link>
              <button
                onClick={handleBegin}
                className={`flex-1 rounded px-4 py-2 text-center text-white ${hasBlocks ? 'cursor-not-allowed bg-gray-400' : 'bg-black'}`}
                disabled={hasBlocks}
              >
                Request quote
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
