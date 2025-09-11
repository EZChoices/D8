import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import Link from "next/link";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return notFound();

  return (
    <div className="section grid md:grid-cols-2 gap-8">
      <div className="card aspect-square grid place-items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="object-contain w-full h-full" />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{p.name}</h1>
        <p className="text-ink-400 mt-2">{p.description}</p>
        {p.strength && <div className="mt-4"><span className="badge">{p.strength}</span></div>}
        <div className="mt-6 flex items-center gap-4">
          <div className="text-2xl font-extrabold">${p.price}</div>
          <Link href="/checkout" className="btn btn-primary">Add to Cart</Link>
        </div>
        <div className="mt-8 text-sm text-ink-400">* MVP: Specs & COAs will be listed here.</div>
      </div>
    </div>
  );
}
