import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-10 grid gap-4 md:grid-cols-2">
        <div className="text-sm text-gray-600">
          <p>
            Products contain hemp-derived cannabinoids. Not for sale to minors. No medical claims. Do not use while driving or operating machinery. Check local regulations.
          </p>
        </div>
        <nav className="text-sm flex flex-wrap gap-4 justify-start md:justify-end">
          <Link href="/lab-tested">Lab-tested</Link>
          <Link href="/discreet-shipping">Discreet Shipping</Link>
          <Link href="/direct-supply">Supply Chain</Link>
          <Link href="/lab-results">Lab Results</Link>
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
