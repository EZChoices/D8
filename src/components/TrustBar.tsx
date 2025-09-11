import Link from "next/link";

const items = [
  { href: "/lab-tested", label: "Third-party Lab-tested" },
  { href: "/discreet-shipping", label: "Discreet Shipping" },
  { href: "/direct-supply", label: "Direct Supply Chain" },
];

export default function TrustBar() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-700 sm:grid-cols-3">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="rounded border p-3 text-center hover:bg-gray-50">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
