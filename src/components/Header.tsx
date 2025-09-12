"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useCart } from "@/components/CartContext";
import MiniCartDrawer from "@/components/MiniCartDrawer";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/quality", label: "Quality" },
  { href: "/cart", label: "Cart" },
  { href: "/payment", label: "Shipping & Payment" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [miniOpen, setMiniOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="brand text-xl font-bold tracking-tight" aria-label="D8 Home">
          D8
        </Link>
        <nav
          aria-label="primary"
          className="primary hidden gap-6 text-sm md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              {item.label}
              {item.href === "/cart" && (
                <span className="ml-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[11px] text-white">
                  {count}
                </span>
              )}
            </Link>
          ))}
          <button
            aria-label="Open mini cart"
            onClick={() => setMiniOpen(true)}
            className="rounded border px-2 py-1"
          >
            🛒
            <span className="ml-1 inline-flex min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
              {count}
            </span>
          </button>
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="hamburger inline-flex items-center justify-center rounded border px-3 py-1 md:hidden"
        >
          ☰
        </button>
      </div>
      <HamburgerMenu open={open} onClose={() => setOpen(false)} />
      <MiniCartDrawer open={miniOpen} onClose={() => setMiniOpen(false)} />
    </header>
  );
}
