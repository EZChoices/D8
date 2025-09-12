"use client";
import Link from "next/link";

export default function HamburgerMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        <button onClick={onClose} aria-label="Close menu" className="mb-3">✕</button>
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
              <Link href="/discreet-shipping" onClick={onClose}>
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={onClose}>
                Cart
              </Link>
            </li>
            <li>
              <Link href="/payment" onClick={onClose}>
                Payment
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
