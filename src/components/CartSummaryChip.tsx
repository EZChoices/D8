"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { getProduct } from "@/data/products";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function CartSummaryChip() {
  const { items } = useCart();
  const { state } = useShipping();
  const { status } = useWholesale();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0) / 100;
  if (count === 0) return null;
  const hasBlocks = items.some((item) => {
    const product = getProduct(item.slug);
    if (!product) return false;
    return !evaluatePurchaseGate(product, { state, wholesaleStatus: status }).canPurchase;
  });
  return (
    <Link
      href="/cart"
      className={`ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
        hasBlocks ? "border-red-300 text-red-700" : ""
      }`}
      aria-label="View cart"
    >
      🛒 {count} · ${subtotal.toFixed(2)}
      {hasBlocks ? <span className="text-xs">Review required</span> : null}
    </Link>
  );
}
