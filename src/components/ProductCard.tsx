// === File: src/components/ProductCard.tsx ===
type ProductProps = {
  name: string;
  price: string;
  image: string;
  description: string;
};

export default function ProductCard({ name, price, image, description }: ProductProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-48 object-contain mb-4" />
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="font-bold mb-2">{price}</p>
      <a href="/checkout" className="bg-black text-white px-4 py-2 inline-block">
        Add to Cart
      </a>
    </div>
  );
}
