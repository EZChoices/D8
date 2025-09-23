export type Product = {
  slug: string;
  title: string;
  category: string;
  price_cents: number;
  potency_mg: number;
  flavor?: string;
  badges?: string[];
  images: string[];
  coa_url?: string;
  batch_id: string;
  effects?: string[]; // e.g., ['Sleep','Relax','Focus','Social']
  size_label?: string; // e.g., '20 ct', '3.5g', '4-pack'
};

import productsJson from "../../content/products.json" assert { type: "json" };

const consumerRestrictedCategories = new Set(["Vape Carts", "Disposables"]);

const allProducts = productsJson as Product[];

export const products = allProducts.filter((product) => !consumerRestrictedCategories.has(product.category));

export const categories = Array.from(new Set(products.map((p) => p.category)));

export const featuredSlugs = products.slice(0, 2).map((p) => p.slug);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
