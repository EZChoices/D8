"use client";
import { useCart } from "@/components/CartContext";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { addToCart as gaAddToCart } from "@/lib/ga";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function AddToCartButton({
  slug,
  title,
  price_cents,
  image,
  category,
  moq,
  children,
  onAdded
}: {
  slug: string;
  title: string;
  price_cents: number;
  image?: string;
  category?: string;
  moq?: number | null;
  children?: React.ReactNode;
  onAdded?: () => void;
}) {
  const { add } = useCart();
  const { state } = useShipping();
  const { status } = useWholesale();
  const gate = evaluatePurchaseGate(
    { slug, title, price_cents, images: image ? [image] : undefined, category } as any,
    { state, wholesaleStatus: status }
  );
  const disabled = !gate.canPurchase;
  return (
    <button
      onClick={() => {
        if (disabled) return;
        const quantity = moq && moq > 0 ? moq : 1;
        add({ slug, title, price_cents, image }, quantity);
        gaAddToCart({ id: slug, name: title, price: price_cents / 100, quantity });
        onAdded?.();
      }}
      className={`rounded px-4 py-2 text-white ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black'}`}
      aria-label={`Add ${title} to cart`}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {children || "Add to Cart"}
    </button>
  );
}
