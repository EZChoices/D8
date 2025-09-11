export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  strength?: string;
  type?: "vape" | "gummies" | "cart";
};

export const products: Product[] = [
  {
    slug: "dream-vape-pen-950mg",
    name: "Dream Vape Pen – 950mg Delta-8",
    price: 35,
    image: "/placeholder_vape.png",
    description: "Smooth, fast-acting, crafted for clean sessions.",
    strength: "950mg",
    type: "vape",
  },
  {
    slug: "chill-gummies-25x20",
    name: "Chill Gummies – 25mg × 20",
    price: 40,
    image: "/placeholder_gummies.png",
    description: "Delicious, discreet gummies for easy evenings.",
    strength: "25mg",
    type: "gummies",
  },
  {
    slug: "refillable-cart-1g",
    name: "Refillable Cart – 1g Delta-8",
    price: 32,
    image: "/placeholder_cart.png",
    description: "Consistent draw, premium extract, zero drama.",
    strength: "1g",
    type: "cart",
  },
];

export const featured = products.slice(0, 2);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
