import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import COAModal from "@/components/COAModal";
import BreadcrumbLd from "@/components/BreadcrumbLd";
import ResponsiveImage from "@/components/ResponsiveImage";
import JsonLd from "@/components/JsonLd";
import { productJsonLd } from "@/lib/productJsonLd";
import ProductCard from "@/components/ProductCard";
import PdpAvailability from "@/components/PdpAvailability";
import ProductPriceGate from "@/components/ProductPriceGate";
import ProductViewTracker from "@/components/ProductViewTracker";

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
  const base = "https://d8-orpin.vercel.app";

  // Choose 3 complementary items from other categories
  const complementary = products
    .filter((p) => p.slug !== product.slug && p.category !== product.category)
    .reduce((acc: any[], p) => {
      if (!acc.find((x) => x.category === p.category)) acc.push(p);
      return acc;
    }, [])
    .slice(0, 3);

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
      <ProductViewTracker product={product} />
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
        {product.effects && product.effects.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-700">
            {product.effects.map((e) => (
              <span key={e} className="rounded border px-2 py-0.5">{e}</span>
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
            <strong>Value:</strong> {(product.potency_mg / (product.price_cents / 100)).toFixed(1)} mg/$
          </p>
          {product.title.toLowerCase().includes('1ml') && (
            <p>
              <strong>Concentration:</strong> {(product.potency_mg).toFixed(0)} mg/ml
            </p>
          )}
          {product as any && (product as any).tested_date && (
            <p>
              <strong>Last tested:</strong> {(product as any).tested_date}
            </p>
          )}
          {product.size_label && (
            <p>
              <strong>Size:</strong> {product.size_label}
            </p>
          )}
          <p>
            <strong>SKU:</strong> {product.slug.toUpperCase()}
          </p>
          <p>
            <strong>Batch ID:</strong> {product.batch_id}
          </p>
          {product.coa_url && (
            <p>
              <COAModal url={product.coa_url} />
            </p>
          )}
          {product.case_pack && (
            <p>
              <strong>Case pack:</strong> {product.case_pack}
            </p>
          )}
          {product.moq_units ? (
            <p>
              <strong>MOQ:</strong> {product.moq_units} units
            </p>
          ) : null}
        </div>
        <ProductPriceGate product={product as any} />
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link href={`/checkout?sku=${product.slug}`} className="rounded bg-black px-5 py-3 text-white">
            Generate wholesale quote
          </Link>
          <Link href="/shop" className="rounded border px-5 py-3">
            Back to catalog
          </Link>
        </div>
        <PdpAvailability product={product} />
      </div>
      <JsonLd json={productJsonLd(product)} />
      <div className="md:col-span-2 text-xs text-gray-600">
        <p>
          Compliance: Shipments require age-gated delivery and a valid reseller or processing license where applicable.
          Products remain hemp-derived with Δ9 THC &lt;0.3% on a dry-weight basis. Maintain records for state inspections.
        </p>
      </div>
      <div className="md:col-span-2">
        <h2 className="mt-8 text-xl font-semibold">Customers also bought</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {complementary.map((p) => (
            <ProductCard key={p.slug} product={p as any} />
          ))}
        </div>
      </div>
    </div>
  );
}


