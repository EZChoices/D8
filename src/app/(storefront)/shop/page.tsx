import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { products as allProducts } from "@/data/products";
import CartFloatButton from "@/components/CartFloatButton";

export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams?: { cat?: string; q?: string; min?: string; max?: string } }) {
  const products = allProducts as any[];
  const cat = searchParams?.cat ? decodeURIComponent(searchParams.cat) : undefined;
  const q = (searchParams?.q || "").toLowerCase();
  const min = parseInt(searchParams?.min || "", 10) || 0;
  const max = parseInt(searchParams?.max || "", 10) || Number.MAX_SAFE_INTEGER;
  const filtered = products.filter((p: any) => {
    if (cat && p.category !== cat) return false;
    if (q && !(`${p.title} ${p.flavor || ""}`.toLowerCase().includes(q))) return false;
    const mg = p.potency_mg || 0;
    if (mg < min || mg > max) return false;
    return true;
  });
  const categories = Array.from(new Set(products.map((p: any) => p.category)));
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
      <form className="mb-3 flex flex-wrap items-end gap-2" action="" method="get">
        <input
          type="search"
          name="q"
          placeholder="Search products"
          defaultValue={q}
          className="rounded border px-3 py-1"
        />
        <label className="text-sm">Min mg <input name="min" type="number" defaultValue={min || ""} className="ml-1 w-20 rounded border px-2 py-1" /></label>
        <label className="text-sm">Max mg <input name="max" type="number" defaultValue={Number.isFinite(max) && max < 1e15 ? max : ""} className="ml-1 w-20 rounded border px-2 py-1" /></label>
        {cat && <input type="hidden" name="cat" value={cat} />}
        <button className="rounded bg-black px-3 py-1 text-white">Filter</button>
        <a href="/shop" className="rounded border px-3 py-1">Reset</a>
      </form>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
        <a href="/shop" className={`rounded border px-3 py-1 ${!cat ? "bg-black text-white" : ""}`}>All</a>
        {categories.map((c: string) => (
          <a
            key={c}
            href={`/shop?cat=${encodeURIComponent(c)}`}
            className={`rounded border px-3 py-1 ${cat === c ? "bg-black text-white" : ""}`}
          >
            {c}
          </a>
        ))}
      </div>
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
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <div>{p.category}</div>
              <div>{p.potency_mg ? `${p.potency_mg} mg` : ""}</div>
            </div>
            <h3 style={{ marginTop: ".5rem" }}>
              <Link href={`/product/${p.slug}`}>{p.title}</Link>
            </h3>
            <div>${(p.price_cents / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <CartFloatButton />
    </section>
  );
}

