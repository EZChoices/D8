// === File: src/app/shop/page.tsx ===
import ProductCard from "@/components/ProductCard";

const products = [
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
  {
    name: "Focus Cartridge – 1g Premium Blend",
    price: "$30",
    image: "/placeholder_cart.png",
    description: "Sleek cart with ultra-pure extract. Designed for mental clarity and mood.",
  },
];

export default function ShopPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shop All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
