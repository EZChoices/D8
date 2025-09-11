import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard(p: Product) {
  return (
    <div className="card p-4 hover:-translate-y-0.5 transition">
      <div className="aspect-[4/3] rounded-xl bg-ink-800 border border-white/5 grid place-items-center overflow-hidden mb-4">
        <Image src={p.image} alt={p.alt} width={400} height={300} className="object-contain w-full h-full max-h-48" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          {p.strength && <p className="text-sm text-ink-400">{p.strength}</p>}
        </div>
        <div className="text-right">
          <div className="font-semibold">${p.price}</div>
          <div className="text-xs text-ink-400">incl. VAT</div>
        </div>
      </div>
      <p className="text-sm text-ink-400 mt-2">{p.description}</p>
      <div className="mt-4 flex gap-3">
        <Link href={`/product/${p.slug}`} className="btn btn-primary">View</Link>
        <Link href="/checkout" className="btn btn-ghost">Add to Cart</Link>
      </div>
    </div>
  );
}
