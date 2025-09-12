import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 grid gap-6 md:grid-cols-2">
        <div className="text-sm text-gray-600">
          <p>Hemp-derived cannabinoids. For adults 21+. Drive safely. Check local regulations.</p>
        </div>
        <nav className="text-sm flex flex-wrap gap-3 justify-start md:justify-end">
          <Link href="/quality">Quality</Link>
          <Link href="/payment">Shipping & Payment</Link>
          <Link href="/where-we-ship">Where we ship</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/shipping-returns">Shipping & Returns</Link>
          <Link href="/refunds">Refunds</Link>
        </nav>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} D8. All rights reserved.</div>
    </footer>
  );
}

