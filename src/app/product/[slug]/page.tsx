import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/db";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full">
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Potency:</strong> {product.potencyMg}mg{product.count ? ` • ${product.count} pcs` : ""}</p>
          {product.flavor && <p><strong>Flavor:</strong> {product.flavor}</p>}
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
        </div>
        <p className="mt-4 text-2xl font-bold">${(product.priceCents / 100).toFixed(2)}</p>
        <div className="mt-6 flex gap-3">
          <Link href={`/checkout?sku=${product.slug}`} className="rounded bg-black px-5 py-3 text-white">Checkout Now</Link>
          <Link href="/shop" className="rounded border px-5 py-3">Back to Shop</Link>
        </div>
        <div className="mt-8 space-y-2 text-sm text-gray-600">
          <p><strong>Warnings:</strong> May cause drowsiness. Do not combine with alcohol or other substances. Keep out of reach of children and pets.</p>
          <p><strong>Legal:</strong> Products contain hemp-derived cannabinoids. Not for sale to minors. No medical claims. Check local regulations.</p>
        </div>
      </div>
    </div>
  );
}
