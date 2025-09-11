"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/lab-tested", label: "Lab-tested" },
  { href: "/discreet-shipping", label: "Shipping" },
  { href: "/direct-supply", label: "Supply Chain" },
  { href: "/lab-results", label: "Lab Results" }
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">D8</Link>
        <nav className="flex gap-6 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "font-semibold" : "text-gray-600 hover:text-gray-900"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
