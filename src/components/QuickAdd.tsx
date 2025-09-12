"use client";
import { useMemo } from "react";
import { useCart } from "@/components/CartContext";

export default function QuickAdd({
  slug,
  title,
  price_cents,
  image
}: {
  slug: string;
  title: string;
  price_cents: number;
  image?: string;
}) {
  const { items, add, setQty } = useCart();
  const qty = useMemo(() => items.find((i) => i.slug === slug)?.quantity || 0, [items, slug]);
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      <button
        className="rounded border px-2 py-1 disabled:opacity-50"
        aria-label="Decrease quantity"
        disabled={qty <= 0}
        onClick={() => setQty(slug, Math.max(0, qty - 1))}
      >
        −
      </button>
      <span className="min-w-[2ch] text-center">{qty}</span>
      <button
        className="rounded border px-2 py-1"
        aria-label="Increase quantity"
        onClick={() => (qty > 0 ? setQty(slug, qty + 1) : add({ slug, title, price_cents, image }, 1))}
      >
        +
      </button>
      <span className="ml-auto text-gray-600">${(price_cents / 100).toFixed(2)}</span>
    </div>
  );
}

