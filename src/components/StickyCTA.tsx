"use client";

export default function StickyCTA({
  title,
  price,
  href
}: {
  title: string;
  price: string;
  href: string;
}) {
  return (
    <div
      role="region"
      aria-label="Purchase actions"
      className="sticky bottom-0 z-[1000] flex items-center justify-between border-t bg-white px-4 py-3"
    >
      <div>
        <strong className="block">{title}</strong>
        <span>{price}</span>
      </div>
      <a
        href={href}
        aria-label="Add to cart"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Add to Cart
      </a>
    </div>
  );
}
