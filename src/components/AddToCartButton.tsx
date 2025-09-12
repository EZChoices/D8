"use client";
import { useCart } from "@/components/CartContext";
import { addToCart as gaAddToCart } from "@/lib/ga";

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
        gaAddToCart({ id: slug, name: title, price: price_cents / 100, quantity: 1 });
        onAdded?.();
      }}
      className="rounded bg-black px-4 py-2 text-white"
      aria-label={`Add ${title} to cart`}
    >
      {children || "Add to Cart"}
    </button>
  );
}
