export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  strength?: string;
  type?: "vape" | "gummies" | "cart";
};

export const products: Product[] = [
  {
    slug: "dream-vape-pen-950mg",
    name: "Dream Vape Pen – 950mg Delta-8",
    price: 35,
    image: "/dream-vape-pen.png",
    alt: "Dream Delta-8 vape pen with 950mg cartridge and packaging",
    description: "Smooth, fast-acting, crafted for clean sessions.",
    strength: "950mg",
    type: "vape",
  },
  {
    slug: "chill-gummies-25x20",
    name: "Chill Gummies – 25mg × 20",
    price: 40,
    image: "/chill-gummies.png",
    alt: "Bottle of Chill Delta-8 gummies, 25mg each, 20-count",
    description: "Delicious, discreet gummies for easy evenings.",
    strength: "25mg",
    type: "gummies",
  },
  {
    slug: "refillable-cart-1g",
    name: "Refillable Cart – 1g Delta-8",
    price: 32,
    image: "/refillable-cart.png",
    alt: "Refillable 1g Delta-8 vape cartridge with box",
    description: "Consistent draw, premium extract, zero drama.",
    strength: "1g",
    type: "cart",
  },
];

export const featured = products.slice(0, 2);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
