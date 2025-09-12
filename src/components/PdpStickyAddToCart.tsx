"use client";
import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/components/CartContext";

export default function PdpStickyAddToCart({
  product
}: {
  product: { slug: string; title: string; price_cents: number; images?: string[] };
}) {
  const img = product.images?.[0];
  const { items, setQty, add } = useCart();
  const line = useMemo(() => items.find((i) => i.slug === product.slug), [items, product.slug]);
  const qty = line?.quantity || 0;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (justAdded) {
      const t = setTimeout(() => setJustAdded(false), 1200);
      return () => clearTimeout(t);
    }
  }, [justAdded]);
  const rawSubtotal = (product.price_cents * (qty || 1)) / 100;
  const rate = qty >= 3 ? 0.15 : qty >= 2 ? 0.1 : 0;
  const discounted = rate > 0 ? rawSubtotal * (1 - rate) : rawSubtotal;

  return (
    <div
      role="region"
      aria-label="Purchase actions"
      className="sticky bottom-0 z-[1000] flex items-center justify-between border-t bg-white px-4 py-3"
    >
      <div>
        <strong className="block">{product.title}</strong>
        <span>${(product.price_cents / 100).toFixed(2)}</span>
        {qty > 0 && (
          <span className="ml-3 text-sm text-gray-600">
            Qty: {qty} · Subtotal: {rate > 0 ? (
              <>
                <s>${rawSubtotal.toFixed(2)}</s> → <strong>${discounted.toFixed(2)}</strong>
              </>
            ) : (
              <>${rawSubtotal.toFixed(2)}</>
            )}
          </span>
        )}
        {qty >= 2 && (
          <div className="text-xs text-green-700">Bundle savings applied: {qty >= 3 ? 15 : 10}%</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQty(product.slug, Math.max(1, qty - 1))}
          disabled={qty <= 1}
          className="rounded border px-2 py-1 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[2ch] text-center">{qty > 0 ? qty : 1}</span>
        <button
          onClick={() => setQty(product.slug, qty + 1 || 2)}
          className="rounded border px-2 py-1"
          aria-label="Increase quantity"
        >
          +
        </button>
        <AddToCartButton
          slug={product.slug}
          title={product.title}
          price_cents={product.price_cents}
          image={img}
          onAdded={() => setJustAdded(true)}
        >
          {justAdded ? "Added" : "Add to Cart"}
        </AddToCartButton>
        <span aria-live="polite" className="text-sm text-green-600">
          {justAdded ? "✓" : ""}
        </span>
      </div>
    </div>
  );
}
