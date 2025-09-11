export type Product = {
  slug: string;
  sku: string;
  name: string;
  description: string;
  price: number; // USD
  category: "vape" | "gummies" | "cart";
  potencyMg: number;
  count?: number; // pieces for gummies
  flavor?: string;
  image: string; // image URL
};

import productsJson from "../../content/products.json" assert { type: "json" };

export const products = productsJson as Product[];

export const featuredSlugs = ["dream-vape-pen-950mg", "chill-gummies-25mg-20"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
