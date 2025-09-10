// === File: src/app/page.tsx ===
import ProductCard from "@/components/ProductCard";

const featured = [
  {
    name: "Dream Vape Pen – 950mg Delta-8",
    price: "$35",
    image: "/placeholder_vape.png",
    description: "Smooth and fast-acting. Perfect for late nights or creative mornings.",
  },
  {
    name: "Chill Gummies – 25mg x 20 pieces",
    price: "$40",
    image: "/placeholder_gummies.png",
    description: "Delicious and discreet Delta-8 gummies. Your go-to evening relaxer.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-2">Pure Delta-8. Nothing Else.</h2>
        <p className="text-lg text-gray-600">From supply to you — direct, honest, clean.</p>
        <div className="mt-6">
          <a href="/shop" className="bg-black text-white px-6 py-3 rounded">
            Browse Products
          </a>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
