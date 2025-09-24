"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { getProduct, formatPrice } from "@/data/products";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function CartStickyBar() {
  const { items } = useCart();
  const { state } = useShipping();
  const { status } = useWholesale();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal_cents = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
  const hasBlocks = items.some((item) => {
    const product = getProduct(item.slug);
    if (!product) return false;
    return !evaluatePurchaseGate(product, { state, wholesaleStatus: status }).canPurchase;
  });
  if (count === 0) return null;
  const canProceed = Boolean(state) && !hasBlocks;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1050] border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span>
            <strong>{count}</strong> lines · {formatPrice(subtotal_cents)}
          </span>
          {!state ? (
            <span className="text-xs text-red-700">Select destination to enable quote requests.</span>
          ) : hasBlocks ? (
            <span className="text-xs text-red-700">Resolve compliance holds to continue.</span>
          ) : (
            <span className="text-xs text-gray-600">Freight quoted after compliance review.</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/cart" className="rounded border px-3 py-1">
            View cart
          </Link>
          <Link
            href={canProceed ? "/checkout" : "#"}
            aria-disabled={!canProceed}
            className={`rounded px-3 py-1 text-white ${canProceed ? "bg-black" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Request quote
          </Link>
        </div>
      </div>
    </div>
  );
}
