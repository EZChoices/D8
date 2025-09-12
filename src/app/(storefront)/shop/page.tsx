import { products as allProducts } from "@/data/products";
import CartFloatButton from "@/components/CartFloatButton";
import ProductCard from "@/components/ProductCard";
import CartStickyBar from "@/components/CartStickyBar";
import CartSummaryChip from "@/components/CartSummaryChip";

export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams?: { cat?: string } }) {
  const products = allProducts as any[];
  const cat = searchParams?.cat ? decodeURIComponent(searchParams.cat) : undefined;
  const filtered = cat ? products.filter((p: any) => p.category === cat) : products;
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

