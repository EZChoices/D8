"use client";
import { useCart } from "@/components/CartContext";

export default function AddToCartButton({
  slug,
  title,
  price_cents,
  image,
  children
}: {
  slug: string;
  title: string;
  price_cents: number;
  image?: string;
  children?: React.ReactNode;
}) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add({ slug, title, price_cents, image })}
      className="rounded bg-black px-4 py-2 text-white"
      aria-label={`Add ${title} to cart`}
    >
      {children || "Add to Cart"}
    </button>
  );
}

