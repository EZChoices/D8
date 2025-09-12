import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, formatPrice } from "@/data/products";
import COAModal from "@/components/COAModal";
import StickyCTA from "@/components/StickyCTA";
import BreadcrumbLd from "@/components/BreadcrumbLd";
import ResponsiveImage from "@/components/ResponsiveImage";
import JsonLd from "@/components/JsonLd";
import { productJsonLd } from "@/lib/productJsonLd";
import PdpStickyAddToCart from "@/components/PdpStickyAddToCart";
import ProductCard from "@/components/ProductCard";

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
  const base = "https://d8-orpin.vercel.app";

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <BreadcrumbLd
        trail={[
          { name: "Home", url: `${base}/` },
          { name: "Shop", url: `${base}/shop` },
          { name: product.title, url: `${base}/product/${product.slug}` }
        ]}
      />
      <div className="relative aspect-square w-full">
        <ResponsiveImage
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
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
        <div className="mt-8">
          <PdpStickyAddToCart product={product} />
        </div>
      </div>
      <JsonLd json={productJsonLd(product)} />
      <div className="md:col-span-2">
        <h2 className="mt-8 text-xl font-semibold">Customers also bought</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.slug !== product.slug && p.category === product.category)
            .slice(0, 3)
            .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
        </div>
      </div>
    </div>
  );
}

