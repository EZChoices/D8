import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shop All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
