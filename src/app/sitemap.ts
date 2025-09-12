import { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

function getProducts() {
  const p = path.join(process.cwd(), "content", "products.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://d8-orpin.vercel.app";
  const staticRoutes = [
    "",
    "/shop",
    "/lab-tested",
    "/discreet-shipping",
    "/direct-supply",
    "/lab-results"
  ];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "daily",
    priority: r === "" ? 1 : 0.7
  }));
  const products = getProducts();
  for (const prod of products) {
    entries.push({
      url: `${base}/product/${prod.slug}`,
      changeFrequency: "weekly",
      priority: 0.8
    });
  }
  return entries;
}
