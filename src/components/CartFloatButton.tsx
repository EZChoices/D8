"use client";
import { useState, useMemo } from "react";
import { useCart } from "@/components/CartContext";
import MiniCartDrawer from "@/components/MiniCartDrawer";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { getProduct } from "@/data/products";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function CartFloatButton() {
  const { items } = useCart();
  const { state } = useShipping();
  const { status } = useWholesale();
  const [open, setOpen] = useState(false);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0) / 100;
  const hasBlocks = useMemo(
    () =>
      items.some((item) => {
        const product = getProduct(item.slug);
        if (!product) return false;
        return !evaluatePurchaseGate(product, { state, wholesaleStatus: status }).canPurchase;
      }),
    [items, state, status]
  );
  if (count === 0) return null;
  const canProceed = Boolean(state) && !hasBlocks;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[1050] rounded-full bg-black px-4 py-2 text-white shadow-lg"
        aria-label="Open cart"
      >
        🛒 {count} · ${subtotal.toFixed(2)} {canProceed ? "" : "(review required)"}
      </button>
      <MiniCartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
