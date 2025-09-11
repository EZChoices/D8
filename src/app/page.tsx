import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import EmailSignup from "@/components/EmailSignup";
import { featuredSlugs, products, categories } from "@/data/products";

const featured = products.filter((p) => featuredSlugs.includes(p.slug as any));

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">Pure Delta-8. Nothing Else.</h1>
        <p className="text-lg text-gray-600">From supply to you — direct, honest, clean.</p>
        <div className="mt-6">
          <a href="/shop" className="bg-black text-white px-6 py-3 rounded">
            Browse Products
          </a>
        </div>
        <TrustBar />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((c) => (
            <a
              key={c}
              href={`/shop?cat=${encodeURIComponent(c)}`}
              className="flex-shrink-0 rounded border px-4 py-2"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
