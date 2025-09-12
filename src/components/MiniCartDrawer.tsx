"use client";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useCart } from "@/components/CartContext";
import { beginCheckout, viewCart } from "@/lib/ga";
import { useEffect } from "react";

export default function MiniCartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, total_cents } = useCart();
  if (!open) return null;
  useEffect(() => {
    if (!open) return;
    viewCart(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const handleBegin = () => {
    beginCheckout(items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity })));
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[1100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <aside
        className="absolute right-0 top-0 h-full w-[92vw] max-w-[420px] bg-white p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mini cart"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">
            Your cart is empty. <Link href="/shop" className="underline">Browse products</Link>.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.slug} className="flex items-center gap-3 border-b pb-3">
                {i.image && (
                  <span className="relative block h-12 w-12">
                    <ResponsiveImage src={i.image} alt={i.title} fill sizes="48px" className="object-contain" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium">{i.title}</div>
                  <div className="text-xs text-gray-600">${(i.price_cents / 100).toFixed(2)}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <button className="rounded border px-2" onClick={() => setQty(i.slug, Math.max(1, i.quantity - 1))} aria-label="Decrease">−</button>
                    <span>{i.quantity}</span>
                    <button className="rounded border px-2" onClick={() => setQty(i.slug, i.quantity + 1)} aria-label="Increase">+</button>
                    <button className="ml-2 text-xs underline" onClick={() => remove(i.slug)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-700">Subtotal</div>
              <div className="text-base font-semibold">${(total_cents / 100).toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1 rounded border px-4 py-2 text-center">View cart</Link>
              <Link
                href="/checkout"
                onClick={handleBegin}
                className="flex-1 rounded bg-black px-4 py-2 text-center text-white"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
