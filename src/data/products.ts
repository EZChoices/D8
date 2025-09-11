export type Product = {
  id?: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  priceCents: number; // price in cents
  category: "vape" | "gummies" | "cart";
  potencyMg: number;
  count?: number;
  flavor?: string;
  image: string;
};

import productsJson from "../../content/products.json" assert { type: "json" };

export const products: Product[] = (productsJson as any).map((p: any) => ({
  slug: p.slug,
  sku: p.sku,
  name: p.name,
  description: p.description,
  priceCents: Math.round(p.price * 100),
  category: p.category,
  potencyMg: p.potencyMg,
  count: p.count,
  flavor: p.flavor,
  image: p.image,
}));

export const featuredSlugs = ["dream-vape-pen-950mg", "chill-gummies-25mg-20"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
