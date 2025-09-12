"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import MiniCartDrawer from "@/components/MiniCartDrawer";

export default function CartFloatButton() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0) / 100;
  if (count === 0) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[1050] rounded-full bg-black px-4 py-2 text-white shadow-lg"
        aria-label="Open cart"
      >
        🛒 {count} · ${subtotal.toFixed(2)}
      </button>
      <MiniCartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

