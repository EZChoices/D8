import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { featured } from "@/lib/products";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section">
        <div className="max-w-3xl">
          <span className="badge">Lab-minded • Residual-free • Straight to you</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Pure Delta-8. <span className="text-brand-500">Nothing else.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-300">
            From supply to you—direct, honest, clean. We source, refine, and deliver
            with zero shortcuts.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/shop" className="btn btn-primary">Browse Products</Link>
            <a href="#why" className="btn btn-ghost">Why Us</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="text-2xl font-bold mb-6">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((p) => <ProductCard key={p.slug} {...p} />)}
        </div>
      </section>

      <section id="why" className="section">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Supply you can trace", "Direct relationships, COAs on request."],
            ["Kept simple", "No mystery blends, no noise—just Delta-8."],
            ["Built for trust", "Clear labels, consistent strengths, real support."]
          ].map(([title, desc]) => (
            <div key={title} className="card p-6">
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-ink-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="card divide-y divide-white/5">
          {[
            ["What’s Delta-8?", "A hemp-derived cannabinoid with a smoother experience."],
            ["Shipping & returns?", "Standard shipping; easy replacements for damaged items."],
            ["Lab testing?", "Yes—COAs available for each batch."]
          ].map(([q, a]) => (
            <details key={q} className="p-6">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-ink-400">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p className="text-ink-400 text-sm mb-4">Wholesale or questions? Drop us a line.</p>
          <a href="mailto:hello@example.com" className="btn btn-primary">Email Us</a>
        </div>
      </section>
    </div>
  );
}
