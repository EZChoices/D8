import { products as allProducts } from "@/data/products";
import CartFloatButton from "@/components/CartFloatButton";
import ProductCard from "@/components/ProductCard";
import CartStickyBar from "@/components/CartStickyBar";
import CartSummaryChip from "@/components/CartSummaryChip";

export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams?: { cat?: string; effect?: string; potency?: string } }) {
  const products = allProducts as any[];
  const cat = searchParams?.cat ? decodeURIComponent(searchParams.cat) : undefined;
  const effect = searchParams?.effect ? decodeURIComponent(searchParams.effect) : undefined;
  const potency = searchParams?.potency as undefined | 'micro' | 'standard' | 'strong';
  function inPotency(p: any) {
    const mg = p.potency_mg || 0;
    if (!potency) return true;
    if (potency === 'micro') return mg >= 2 && mg <= 10;
    if (potency === 'standard') return mg >= 20 && mg <= 30;
    if (potency === 'strong') return mg >= 40;
    return true;
  }
  const filtered = products.filter((p: any) => {
    if (cat && p.category !== cat) return false;
    if (effect && !(p.effects || []).includes(effect)) return false;
    if (!inPotency(p)) return false;
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
      <div className="flex items-center gap-3">
        <h1>Shop</h1>
        <CartSummaryChip />
      </div>
      {/* Filters removed for a sleeker MVP; category chips retained */}
      <div className="mb-2 flex gap-2 overflow-x-auto pb-2">
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
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span>Effect:</span>
        {['Sleep','Relax','Focus','Social'].map((e) => (
          <a key={e} href={`?${new URLSearchParams({ ...(cat?{cat}:{ }), effect: e, potency: potency || '' } as any).toString()}`} className={`rounded border px-2 py-0.5 ${effect===e? 'bg-black text-white':''}`}>{e}</a>
        ))}
        <a href={`?${new URLSearchParams({ ...(cat?{cat}:{ }), potency: potency || '' } as any).toString()}`} className="rounded px-2 py-0.5 text-gray-600">Clear</a>
        <span className="ml-3">Potency:</span>
        {[
          {k:'micro',label:'Micro 2–10 mg'},
          {k:'standard',label:'Standard 20–30 mg'},
          {k:'strong',label:'Strong 40–60+ mg'}
        ].map(o => (
          <a key={o.k} href={`?${new URLSearchParams({ ...(cat?{cat}:{ }), effect: effect || '', potency: o.k } as any).toString()}`} className={`rounded border px-2 py-0.5 ${potency===o.k? 'bg-black text-white':''}`}>{o.label}</a>
        ))}
        <a href={`?${new URLSearchParams({ ...(cat?{cat}:{ }), effect: effect || '' } as any).toString()}`} className="rounded px-2 py-0.5 text-gray-600">Clear</a>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p: any) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <CartFloatButton />
      <CartStickyBar />
    </section>
  );
}

