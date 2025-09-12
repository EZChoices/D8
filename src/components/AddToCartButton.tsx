"use client";
import { useCart } from "@/components/CartContext";

export default function AddToCartButton({
  slug,
  title,
  price_cents,
  image,
  children,
  onAdded
}: {
  slug: string;
  title: string;
  price_cents: number;
  image?: string;
  children?: React.ReactNode;
  onAdded?: () => void;
}) {
  const { add } = useCart();
  return (
    <button
      onClick={() => {
        add({ slug, title, price_cents, image });
        onAdded?.();
      }}
      className="rounded bg-black px-4 py-2 text-white"
      aria-label={`Add ${title} to cart`}
    >
      {children || "Add to Cart"}
    </button>
  );
}
