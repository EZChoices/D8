export function productJsonLd(p: {
  slug: string;
  title: string;
  price_cents: number;
  potency_mg?: number;
  flavor?: string;
  sku?: string;
  batch_id?: string;
  category?: string;
  images?: string[];
  coa_url?: string;
}) {
  const price = (p.price_cents / 100).toFixed(2);
  const json: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.title,
    image: p.images && p.images.length ? p.images.map((i) => `https://d8-orpin.vercel.app${i}`) : undefined,
    description: `${p.title}${p.flavor ? " • " + p.flavor : ""}${p.potency_mg ? " • " + p.potency_mg + " mg" : ""}`,
    sku: p.sku || p.slug,
    brand: { "@type": "Brand", name: "D8" },
    additionalProperty: [
      p.potency_mg ? { "@type": "PropertyValue", name: "Potency (mg)", value: String(p.potency_mg) } : null,
      p.flavor ? { "@type": "PropertyValue", name: "Flavor", value: p.flavor } : null,
      p.batch_id ? { "@type": "PropertyValue", name: "Batch ID", value: p.batch_id } : null
    ].filter(Boolean),
    offers: {
      "@type": "Offer",
      url: `https://d8-orpin.vercel.app/product/${p.slug}`,
      priceCurrency: "USD",
      price: price,
      availability: "https://schema.org/InStock"
    }
  };
  return json;
}

