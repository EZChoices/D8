"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartSummaryChip() {
  const { items } = useCart();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0) / 100;
  if (count === 0) return null;
  return (
    <Link
      href="/cart"
      className="ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
      aria-label="View cart"
    >
      🛒 {count} · ${subtotal.toFixed(2)}
    </Link>
  );
}

