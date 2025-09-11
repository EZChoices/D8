import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="block rounded border p-4 hover:shadow-md transition">
      <div className="relative mb-3 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
          priority={false}
        />
      </div>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">
        {product.flavor ? `${product.flavor} • ` : ""}
        {product.potencyMg}mg{product.count ? ` • ${product.count} pcs` : ""}
      </p>
      <p className="mt-1 font-bold">${(product.priceCents / 100).toFixed(2)}</p>
      <span className="mt-3 inline-block rounded bg-black px-4 py-2 text-sm text-white">View product</span>
    </Link>
  );
}
