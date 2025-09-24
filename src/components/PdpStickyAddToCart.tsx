"use client";
import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/components/CartContext";

export default function PdpStickyAddToCart({
  product
}: {
  product: {
    slug: string;
    title: string;
    price_cents: number;
    images?: string[];
    category?: string;
    case_pack?: string | null;
    moq_units?: number | null;
  };
}) {
  const img = product.images?.[0];
  const { items, setQty, add } = useCart();
  const line = useMemo(() => items.find((i) => i.slug === product.slug), [items, product.slug]);
  const qty = line?.quantity || 0;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (justAdded) {
      const timeout = setTimeout(() => setJustAdded(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [justAdded]);

  const displayedQty = qty > 0 ? qty : product.moq_units || 1;
  const subtotal = ((product.price_cents * displayedQty) / 100).toFixed(2);

  return (
    <div
      role="region"
      aria-label="Purchase actions"
      className="sticky bottom-0 z-[1000] flex flex-wrap items-center justify-between gap-3 border-t bg-white px-4 py-3"
    >
      <div className="min-w-[200px]">
        <strong className="block text-sm sm:text-base">{product.title}</strong>
        <div className="text-sm text-gray-700">
          {product.case_pack ? <span>Case pack: {product.case_pack}</span> : null}
          {product.moq_units ? <span className="ml-2">MOQ: {product.moq_units}</span> : null}
        </div>
        <div className="text-sm text-gray-600">Subtotal (preview): ${subtotal}</div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => setQty(product.slug, Math.max(1, displayedQty - 1))}
          disabled={displayedQty <= 1}
          className="rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[2ch] text-center">{displayedQty}</span>
        <button
          onClick={() =>
            displayedQty > 0
              ? setQty(product.slug, displayedQty + 1)
              : add({ slug: product.slug, title: product.title, price_cents: product.price_cents, image: img })
          }
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
          category={product.category}
          moq={product.moq_units || null}
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
