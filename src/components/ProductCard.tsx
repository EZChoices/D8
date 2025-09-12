import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Product, formatPrice } from "@/data/products";
import QuickAdd from "@/components/QuickAdd";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded border p-4 transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative mb-3 aspect-square">
          <ResponsiveImage
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">
          {product.flavor ? `${product.flavor} • ` : ""}
          {product.potency_mg}mg
        </p>
        {product.badges && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.badges.map((b) => (
              <span key={b} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                {b}
              </span>
            ))}
          </div>
        )}
      </Link>
      <p className="mt-1 font-bold">{formatPrice(product.price_cents)}</p>
      <p className="text-xs text-green-700">Buy 2 save 10% · 3+ save 15%</p>
      <QuickAdd
        slug={product.slug}
        title={product.title}
        price_cents={product.price_cents}
        image={product.images?.[0]}
      />
      <Link href={`/product/${product.slug}`} className="mt-3 inline-block rounded bg-black px-4 py-2 text-sm text-white">
        View product
      </Link>
    </div>
  );
}

