"use client";
import AddToCartButton from "@/components/AddToCartButton";

export default function PdpStickyAddToCart({
  product
}: {
  product: { slug: string; title: string; price_cents: number; images?: string[] };
}) {
  const img = product.images?.[0];
  return (
    <div
      role="region"
      aria-label="Purchase actions"
      className="sticky bottom-0 z-[1000] flex items-center justify-between border-t bg-white px-4 py-3"
    >
      <div>
        <strong className="block">{product.title}</strong>
        <span>${(product.price_cents / 100).toFixed(2)}</span>
      </div>
      <AddToCartButton
        slug={product.slug}
        title={product.title}
        price_cents={product.price_cents}
        image={img}
      />
    </div>
  );
}

