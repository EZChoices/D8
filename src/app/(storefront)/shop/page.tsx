import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";

function getProducts() {
  const p = path.join(process.cwd(), "content", "products.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams?: { cat?: string } }) {
  const products = getProducts();
  const cat = searchParams?.cat ? decodeURIComponent(searchParams.cat) : undefined;
  const filtered = cat ? products.filter((p: any) => p.category === cat) : products;
  const intros: Record<string, string> = {
    "Vape Carts":
      "Pick carts for fast onset and precise control—ideal if you already have a 510 battery. Choose your strain and potency for a consistent, clean draw.",
    Disposables:
      "No battery or maintenance needed—just unbox and draw. Perfect for travel or when you want setup‑free simplicity.",
    Gummies:
      "Great for a smooth, steady experience. Start with 1 gummy (25 mg), wait at least 60–90 minutes before considering more.",
    Chocolates:
      "A delicious way to enjoy Delta‑8. Break it into squares for easy dose control. Store cool and dry.",
    "Tinctures / Oils":
      "Flexible dosing: place drops under the tongue and hold for 30–60 seconds. Start low, increase slowly.",
    Topicals:
      "Targeted application with clean textures. Apply to skin as directed; avoid broken skin or sensitive areas."
  };
  return (
    <section className="section">
      <h1>Shop</h1>
      {cat ? (
        <p>
          <strong>{cat}:</strong> {intros[cat] || "Browse products in this category."}
        </p>
      ) : (
        <p>
          Browse all products. Use filters (coming soon) to narrow by form factor, potency, and price.
        </p>
      )}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}
      >
        {filtered.map((p: any) => (
          <div key={p.slug} style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1rem" }}>
            <a href={`/product/${p.slug}`} aria-label={p.title}>
              <div style={{ position: "relative", aspectRatio: "3/4", width: "100%" }}>
                <ResponsiveImage
                  src={p.images?.[0] || "/placeholder_vape.png"}
                  alt={`${p.title}${p.potency_mg ? " — " + p.potency_mg + " mg" : ""}${p.flavor ? " — " + p.flavor : ""}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                  className="object-contain"
                />
              </div>
            </a>
            <h3 style={{ marginTop: ".5rem" }}>
              <Link href={`/product/${p.slug}`}>{p.title}</Link>
            </h3>
            <div>${(p.price_cents / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

