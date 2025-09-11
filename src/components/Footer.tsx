import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="container py-10 grid gap-8 md:grid-cols-3 text-sm text-ink-300">
        <div>
          <div className="font-display text-lg font-bold mb-2 text-ink-100">D8</div>
          <p>Clean Delta-8, straight from trusted supply to you.</p>
        </div>
        <div>
          <div className="font-semibold mb-2 text-ink-100">Explore</div>
          <ul className="space-y-2">
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/#why" className="hover:underline">Why Us</Link></li>
            <li><Link href="/#faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-ink-100">Legal</div>
          <ul className="space-y-2">
            <li><Link href="/legal/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/legal/privacy" className="hover:underline">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-ink-500 pb-8">© {new Date().getFullYear()} D8</div>
    </footer>
  );
}
