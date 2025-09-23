import type { Metadata } from "next";
import Link from "next/link";
import {
  wholesaleProducts,
  wholesaleCategories,
  getDiscountedBreaks,
  formatCurrency,
} from "@/data/wholesale";

export const metadata: Metadata = {
  title: "Wholesale Catalog",
  description: "Current wholesale menu with WSP, MSRP, and quantity break pricing.",
};

type ProductRow = (typeof wholesaleProducts)[number];

function makeDisplayName(product: ProductRow) {
  const parts = [product.brand, product.name, product.variant, product.strain].filter(Boolean);
  return parts.join(" — ");
}

function packLabel(product: ProductRow) {
  if (!product.pack && !product.unit) return "—";
  if (product.pack && product.unit) return `${product.pack} (${product.unit})`;
  return product.pack || product.unit || "—";
}

function renderQuantityBreaks(product: ProductRow) {
  const breaks = getDiscountedBreaks(product);
  if (!breaks.length) return "—";
  return breaks
    .map((rule) => {
      const price = formatCurrency(rule.discounted_wsp) || "—";
      return `${rule.min_qty}+ @ ${price} (${rule.percent_off}% off)`;
    })
    .join("; ");
}

const grouped = wholesaleCategories.map((category) => {
  const items = wholesaleProducts
    .filter((p) => p.category === category)
    .sort((a, b) => {
      if (a.subcategory === b.subcategory) {
        return makeDisplayName(a).localeCompare(makeDisplayName(b));
      }
      return a.subcategory.localeCompare(b.subcategory);
    });
  const subGroups = items.reduce((acc, product) => {
    if (!acc[product.subcategory]) acc[product.subcategory] = [] as ProductRow[];
    acc[product.subcategory].push(product);
    return acc;
  }, {} as Record<string, ProductRow[]>);
  return { category, subGroups };
});

export default function WholesalePage() {
  return (
    <section className="section space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-gray-500">For licensed businesses · 21+</p>
        <h1 className="text-3xl font-bold">Wholesale Catalog</h1>
        <p className="max-w-3xl text-gray-700">
          Verified batches with attached COAs available on request. Pricing shown is wholesale (WSP) and MSRP for quick
          reference; services require a custom quote. Vapes and carts remain restricted to business accounts per compliance guidance.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/contact" className="rounded border px-4 py-2">Request line sheet</Link>
          <Link href="/quality" className="rounded border px-4 py-2">Quality & COA process</Link>
        </div>
        <p className="text-xs text-gray-600">
          Quantity discounts auto-apply to qualifying orders. Need contract manufacturing or white label? Mention it when you reach out.
        </p>
      </header>

      <nav aria-label="Wholesale categories" className="flex flex-wrap gap-2 text-sm">
        {grouped.map(({ category }) => (
          <a key={category} href={`#${category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} className="rounded border px-3 py-1">
            {category}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {grouped.map(({ category, subGroups }) => (
          <section key={category} id={category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">{category}</h2>
              <p className="text-sm text-gray-600">MSRP reflects suggested retail targets; adjust for your market as needed.</p>
            </div>
            {Object.entries(subGroups).map(([subcategory, items]) => (
              <div key={subcategory} className="space-y-3">
                <h3 className="text-lg font-semibold">{subcategory}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">Product</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">Pack</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">Cost</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">WSP</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">MSRP</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">Qty Breaks</th>
                        <th scope="col" className="px-3 py-2 font-medium text-gray-600">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((product) => {
                        const cost = formatCurrency(product.cost ?? null);
                        const wsp = formatCurrency(product.wsp ?? null);
                        const msrp = formatCurrency(product.msrp ?? null);
                        const qtyBreaks = renderQuantityBreaks(product);
                        const wholesaleOnly = product.b2b_only || product.category === "Vapes" || product.category === "Carts";
                        const isService = product.category === "Services" || (product.wsp == null && product.msrp == null);
                        return (
                          <tr key={product.id} className="align-top">
                            <td className="px-3 py-3">
                              <div className="font-medium">{makeDisplayName(product)}</div>
                              <div className="text-xs text-gray-500">SKU: {product.id}</div>
                              {wholesaleOnly ? (
                                <span className="mt-1 inline-flex rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                                  Wholesale only
                                </span>
                              ) : null}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">{packLabel(product)}</td>
                            <td className="px-3 py-3 whitespace-nowrap">{cost ?? "—"}</td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              {isService ? "Contact for quote" : wsp ?? "—"}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">{isService ? "Contact" : msrp ?? "—"}</td>
                            <td className="px-3 py-3 min-w-[200px]">{isService ? "—" : qtyBreaks}</td>
                            <td className="px-3 py-3 max-w-[260px] text-gray-600">{product.notes || "COA available on request."}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <footer className="space-y-2 text-sm text-gray-600">
        <p>
          Need COAs for onboarding? Reference the batch IDs in your PO and we will attach the latest ISO 17025 lab reports. All
          items ship from licensed facilities; allow 2–4 days to stage pallet orders.
        </p>
        <p className="text-xs">
          Compliance reminder: consumer site hides all inhalable hardware. Wholesale customers must submit appropriate licensing
          before first fulfillment.
        </p>
      </footer>
    </section>
  );
}
