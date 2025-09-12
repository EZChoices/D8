"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartStickyBar() {
  const { items } = useCart();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal_cents = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
  if (count === 0) return null;
  const rate = count >= 3 ? 0.15 : count >= 2 ? 0.1 : 0;
  const discounted_cents = Math.round(subtotal_cents * (1 - rate));
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1050] border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span>
            <strong>{count}</strong> items ·
          </span>
          {rate > 0 ? (
            <span>
              <s>${(subtotal_cents / 100).toFixed(2)}</s> → <strong>${(discounted_cents / 100).toFixed(2)}</strong>
            </span>
          ) : (
            <span>
              <strong>${(subtotal_cents / 100).toFixed(2)}</strong>
            </span>
          )}
          {rate > 0 && (
            <span className="text-green-700">(bundle −{Math.round(rate * 100)}%)</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/cart" className="rounded border px-3 py-1">View cart</Link>
          <Link href="/checkout" className="rounded bg-black px-3 py-1 text-white">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
