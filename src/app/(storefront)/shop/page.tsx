import type { Metadata } from "next";
import { getProductsByChannel } from "@/data/products";
import CartFloatButton from "@/components/CartFloatButton";
import ProductCard from "@/components/ProductCard";
import CartStickyBar from "@/components/CartStickyBar";
import CartSummaryChip from "@/components/CartSummaryChip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop Wholesale & Retail Packs",
  description:
    "Browse bulk THCA flower, concentrates, and limited retail packs with compliance-driven availability by state."
};

type Search = {
  cat?: string;
  effect?: string;
  potency?: string;
  view?: string;
};

const WHOLESALE_ORDER = ["Hemp Flower", "Concentrate Wax", "Vape Carts", "Disposables"];
const RETAIL_ORDER = [
  "Gummies",
  "Chocolates",
  "Tinctures / Oils",
  "Capsules",
  "Seltzer",
  "Drinkables & Syrups",
  "Samplers & Bundles",
  "Accessories & Starter Kits",
  "Topicals"
];

const INTROS: Record<string, string> = {
  Gummies:
    "Great for a smooth, steady experience. Start with one piece and allow 60–90 minutes before considering more.",
  Chocolates:
    "A boutique edible format—keep cool and dry. Break into scored squares for precise dosing.",
  "Tinctures / Oils":
    "Sublingual delivery for flexible titration. Hold under the tongue for 30–60 seconds before swallowing.",
  Topicals:
    "Targeted application with cosmetic-grade bases. Avoid broken skin and follow local regulations for merchandising."
};

function orderCategories(view: "wholesale" | "retail", categories: string[]) {
  const order = view === "retail" ? RETAIL_ORDER : WHOLESALE_ORDER;
  return categories.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export default async function Page({ searchParams }: { searchParams?: Search }) {
  const view = searchParams?.view === "retail" ? "retail" : "wholesale";
  const products = getProductsByChannel(view === "retail" ? "retail" : "wholesale") as any[];
  const cat = searchParams?.cat ? decodeURIComponent(searchParams.cat) : undefined;
  const effect = searchParams?.effect ? decodeURIComponent(searchParams.effect) : undefined;
  const potency = searchParams?.potency as undefined | "micro" | "standard" | "strong";

  const inPotency = (p: any) => {
    const mg = p.potency_mg || 0;
    if (!potency) return true;
    if (potency === "micro") return mg >= 2 && mg <= 10;
    if (potency === "standard") return mg >= 20 && mg <= 30;
    if (potency === "strong") return mg >= 40;
    return true;
  };

  const filtered = products.filter((p: any) => {
    if (cat && p.category !== cat) return false;
    if (effect && !(p.effects || []).includes(effect)) return false;
    if (!inPotency(p)) return false;
    return true;
  });

  const categories = orderCategories(
    view,
    Array.from(new Set(products.map((p: any) => p.category)))
  );

  return (
    <section className="section">
      <div className="flex items-center gap-3">
        <h1>Shop</h1>
        <CartSummaryChip />
      </div>
      <div role="tablist" aria-label="Sales channel" className="mt-2 flex gap-2">
        <a
          role="tab"
          aria-selected={view === "wholesale"}
          href="/shop?view=wholesale"
          className={`rounded px-3 py-1 text-sm ${view === "wholesale" ? "bg-black text-white" : "border"}`}
        >
          Wholesale catalog
        </a>
        <a
          role="tab"
          aria-selected={view === "retail"}
          href="/shop?view=retail"
          className={`rounded px-3 py-1 text-sm ${view === "retail" ? "bg-black text-white" : "border"}`}
        >
          Retail (limited)
        </a>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[220px,1fr]">
        <aside className="md:sticky md:top-[64px]">
          <nav aria-label="Categories" className="text-sm">
            <a
              href={`/shop?view=${view}`}
              className={`block rounded px-2 py-1 ${!cat ? "bg-black text-white" : ""}`}
            >
              All
            </a>
            {categories.map((c) => (
              <a
                key={c}
                href={`/shop?view=${view}&cat=${encodeURIComponent(c)}`}
                className={`block rounded px-2 py-1 ${cat === c ? "bg-black text-white" : ""}`}
              >
                {c}
              </a>
            ))}
          </nav>
          <div className="mt-4 text-sm">
            <div className="font-semibold">Effect</div>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {["Sleep", "Relax", "Focus", "Social"].map((e) => (
                <a
                  key={e}
                  href={`?${new URLSearchParams({ view, ...(cat ? { cat } : {}), effect: e, potency: potency || "" } as any).toString()}`}
                  className={`rounded border px-2 py-0.5 ${effect === e ? "bg-black text-white" : ""}`}
                >
                  {e}
                </a>
              ))}
              <a
                href={`?${new URLSearchParams({ view, ...(cat ? { cat } : {}), potency: potency || "" } as any).toString()}`}
                className="rounded px-2 py-0.5 text-gray-600"
              >
                Clear
              </a>
            </div>
            <div className="mt-3 font-semibold">Potency</div>
            <div className="mt-1 grid grid-cols-1 gap-1">
              {[
                { k: "micro", label: "Micro 2–10 mg" },
                { k: "standard", label: "Standard 20–30 mg" },
                { k: "strong", label: "Strong 40–60+ mg" }
              ].map((o) => (
                <a
                  key={o.k}
                  href={`?${new URLSearchParams({ view, ...(cat ? { cat } : {}), effect: effect || "", potency: o.k } as any).toString()}`}
                  className={`rounded border px-2 py-0.5 ${potency === o.k ? "bg-black text-white" : ""}`}
                >
                  {o.label}
                </a>
              ))}
              <a
                href={`?${new URLSearchParams({ view, ...(cat ? { cat } : {}), effect: effect || "" } as any).toString()}`}
                className="rounded px-2 py-0.5 text-gray-600"
              >
                Clear
              </a>
            </div>
          </div>
        </aside>
        <main>
          <nav aria-label="breadcrumbs" className="text-sm text-gray-600">
            <a href="/" className="underline">
              Home
            </a>{" "}
            <span aria-hidden>›</span>{" "}
            <a href={`/shop?view=${view}`} className="underline">
              Shop
            </a>
            {cat ? (
              <>
                <span aria-hidden>›</span> <span aria-current="page">{cat}</span>
              </>
            ) : null}
          </nav>
          {cat ? (
            <p>
              <strong>{cat}:</strong> {INTROS[cat] || "Browse products in this category."}
            </p>
          ) : view === "wholesale" ? (
            <p className="text-sm text-gray-600">
              Pricing reflects case quantities. Approved wholesale partners see inhalable SKUs after KYC review.
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Retail-ready packs ship only where compliant—review state restrictions before checkout.
            </p>
          )}
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p: any) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </main>
      </div>
      <CartFloatButton />
      <CartStickyBar />
    </section>
  );
}
