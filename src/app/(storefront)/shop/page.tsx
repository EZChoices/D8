"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

function ShopContent() {
  const search = useSearchParams();
  const initial = search.get("cat");
  const [cat, setCat] = useState<string | null>(initial);
  const filtered = cat ? products.filter((p) => p.category === cat) : products;

  return (
    <div className="md:flex md:gap-8">
      <aside className="md:w-48 mb-6 md:mb-0">
        <h2 className="font-semibold mb-2">Categories</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <button
              className={`block w-full text-left ${cat === null ? "font-semibold" : "text-gray-600"}`}
              onClick={() => setCat(null)}
            >
              All
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                className={`block w-full text-left ${cat === c ? "font-semibold" : "text-gray-600"}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}

