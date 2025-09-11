import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://d8-<your-vercel-subdomain>.vercel.app";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/shop`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
    { url: `${base}/terms`, lastModified: now },
    { url: `${base}/shipping-returns`, lastModified: now },
    { url: `${base}/lab-results`, lastModified: now },
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: now }))
  ];
}
