"use client";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Product, formatPrice } from "@/data/products";
import QuickAdd from "@/components/QuickAdd";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function ProductCard({ product }: { product: Product }) {
  const { state } = useShipping();
  const { status } = useWholesale();
  const gate = evaluatePurchaseGate(product, { state, wholesaleStatus: status });
  const showPrice = !gate.requiresWholesale || status === "approved";
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
        {product.effects && product.effects.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-700">
            {product.effects.map((e) => (
              <span key={e} className="rounded border px-2 py-0.5">{e}</span>
            ))}
          </div>
        )}
      </Link>
      <div className="mt-1 text-sm">
        {showPrice ? (
          <span className="font-bold text-lg">{formatPrice(product.price_cents)}</span>
        ) : (
          <span className="font-semibold text-gray-600">Wholesale pricing locked</span>
        )}
      </div>
      {product.size_label && (
        <p className="text-xs text-gray-600">Size: {product.size_label}</p>
      )}
      {product.case_pack && (
        <p className="text-xs text-gray-600">Case pack: {product.case_pack}</p>
      )}
      {product.moq_units ? (
        <p className="text-xs text-gray-600">MOQ: {product.moq_units} units</p>
      ) : null}
      {gate.messages.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-amber-700">
          {gate.messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      {gate.canPurchase && showPrice ? (
        <QuickAdd
          slug={product.slug}
          title={product.title}
          price_cents={product.price_cents}
          image={product.images?.[0]}
        />
      ) : null}
      <Link href={`/product/${product.slug}`} className="mt-3 inline-block rounded bg-black px-4 py-2 text-sm text-white">
        {gate.canPurchase && showPrice ? "View product" : "View details"}
      </Link>
      {!gate.canPurchase && gate.requiresWholesale && (
        <Link
          href="/wholesale#access"
          className="mt-2 inline-block rounded border border-dashed px-4 py-2 text-xs"
        >
          Request wholesale access
        </Link>
      )}
    </div>
  );
}
