export type SalesChannel = "wholesale" | "retail";

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
  channels?: SalesChannel[];
  tags?: string[];
  compliance_tags?: string[];
  moq_units?: number | null;
  case_pack?: string | null;
  tested_date?: string;
  test_status?: string;
  lab?: string;
};

import productsJson from "../../content/products.json" assert { type: "json" };

const DEFAULT_CHANNEL: SalesChannel[] = ["retail"];

const allProducts = (productsJson as Product[]).map((product) => ({
  ...product,
  channels: product.channels && product.channels.length > 0 ? product.channels : DEFAULT_CHANNEL,
  tags: product.tags || [],
  compliance_tags: product.compliance_tags || [],
}));

export const products = allProducts;

export function getProductsByChannel(channel: SalesChannel) {
  return allProducts.filter((product) => product.channels?.includes(channel));
}

export function getProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

export const categories = Array.from(new Set(allProducts.map((p) => p.category)));

export const featuredSlugs = allProducts.slice(0, 2).map((p) => p.slug);

export function formatPrice(cents: number | null | undefined) {
  if (cents == null) return "—";
  return `$${(cents / 100).toFixed(2)}`;
}
