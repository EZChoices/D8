import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, formatPrice } from "@/data/products";
import COAModal from "@/components/COAModal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.flavor || undefined,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();
  const sku = product.slug.toUpperCase();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full">
        <Image src={product.images[0]} alt={product.title} fill className="object-contain" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        {product.badges && (
          <div className="mt-2 flex flex-wrap gap-1 text-sm">
            {product.badges.map((b) => (
              <span key={b} className="rounded bg-gray-100 px-2 py-0.5">
                {b}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>
            <strong>Potency:</strong> {product.potency_mg}mg
          </p>
          {product.flavor && (
            <p>
              <strong>Flavor:</strong> {product.flavor}
            </p>
          )}
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>SKU:</strong> {sku}
          </p>
          <p>
            <strong>Batch ID:</strong> {product.batch_id}
          </p>
        </div>
        <p className="mt-4 text-2xl font-bold">{formatPrice(product.price_cents)}</p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link href={`/checkout?sku=${product.slug}`} className="rounded bg-black px-5 py-3 text-white">
            Checkout Now
          </Link>
          <Link href="/shop" className="rounded border px-5 py-3">
            Back to Shop
          </Link>
          {product.coa_url && <COAModal url={product.coa_url} />}
        </div>
      </div>
    </div>
  );
}

