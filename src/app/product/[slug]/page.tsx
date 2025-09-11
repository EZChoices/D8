import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="section grid md:grid-cols-2 gap-8">
      <div className="card aspect-square grid place-items-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="object-contain w-full h-full"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-ink-400 mt-2">{product.description}</p>
        <div className="mt-6 text-2xl font-extrabold">${product.price}</div>
      </div>
    </div>
  );
}
