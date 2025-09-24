import ProductCard from "@/components/ProductCard";
import EmailSignup from "@/components/EmailSignup";
import { getProductsByChannel } from "@/data/products";
import CartFloatButton from "@/components/CartFloatButton";

const wholesaleProducts = getProductsByChannel("wholesale");
const primaryCats = ["Hemp Flower", "Concentrate Wax", "Vape Carts"] as const;
const featured = primaryCats
  .map((c) => wholesaleProducts.find((p) => p.category === c))
  .filter(Boolean) as typeof wholesaleProducts;
const wholesaleCategories = Array.from(new Set(wholesaleProducts.map((p) => p.category)));

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="mb-2 text-4xl font-bold">Bulk THCA Flower &amp; Extracts for Licensed Buyers</h1>
        <p className="text-lg text-gray-700">
          Contract-grown indoor flower, fresh frozen inputs, and compliant concentrates staged for B2B shipment. Every lot ships
          with ISO-17025 certificates and verification of licensing before release. Vapes and disposables remain restricted to
          approved wholesale accounts.
        </p>
        <div className="mt-6">
          <a href="/wholesale" className="rounded bg-black px-6 py-3 text-white">
            View wholesale catalog
          </a>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-3">
          {[
            "GMP-aligned processing partners",
            "COAs and traceability by batch",
            "State-by-state compliance screening"
          ].map((item) => (
            <div key={item} className="rounded border px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {wholesaleCategories.map((c) => (
            <a
              key={c}
              href={`/shop?view=wholesale&cat=${encodeURIComponent(c)}`}
              className="flex-shrink-0 rounded border px-4 py-2"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Get early drops & limited runs</h2>
        <p className="text-sm text-gray-600">No spam, ever.</p>
        <EmailSignup />
      </section>
      <CartFloatButton />
    </div>
  );
}
