"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import MiniCartDrawer from "@/components/MiniCartDrawer";

export default function HamburgerMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { count } = useCart();
  const [miniOpen, setMiniOpen] = useState(false);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[1001] bg-black/40"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-[80vw] max-w-[360px] overflow-y-auto bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <button onClick={onClose} aria-label="Close menu">✕</button>
          <button
            onClick={() => {
              setMiniOpen(true);
              onClose();
            }}
            className="rounded border px-2 py-1"
            aria-label="Open cart"
          >
            🛒
            <span className="ml-1 inline-flex min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
              {count}
            </span>
          </button>
        </div>
        <nav aria-label="mobile">
          <ul className="grid gap-2 text-lg">
            <li>
              <Link href="/shop" onClick={onClose}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/quality" onClick={onClose}>
                Quality
              </Link>
            </li>
            <li>
              <Link href="/payment" onClick={onClose}>
                Shipping & Payment
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <MiniCartDrawer open={miniOpen} onClose={() => setMiniOpen(false)} />
    </div>
  );
}
