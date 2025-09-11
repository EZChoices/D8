"use client";
import Link from "next/link";
import { useState } from "react";

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"/>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const Links = () => (
    <div className="flex flex-col md:flex-row gap-6 md:items-center">
      <Link href="/shop" className="hover:opacity-80">Shop</Link>
      <a href="/#why" className="hover:opacity-80">Why Us</a>
      <a href="/#faq" className="hover:opacity-80">FAQ</a>
      <a href="/#contact" className="hover:opacity-80">Contact</a>
      <Link href="/checkout" className="btn btn-ghost">Checkout</Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-ink-900/80 backdrop-blur border-b border-white/5">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          D8<span className="text-brand-500">.</span>
        </Link>
        <nav className="hidden md:block"><Links /></nav>
        <button onClick={()=>setOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-white/5"><IconMenu/></button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 bg-ink-900/95 p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-xl font-extrabold">D8</span>
            <button onClick={()=>setOpen(false)} className="p-2 rounded-lg hover:bg-white/5"><IconX/></button>
          </div>
          <Links />
        </div>
      )}
    </header>
  );
}
