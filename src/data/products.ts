export type Product = {
  slug: string;
  sku: string;
  name: string;
  description: string;
  price: number; // USD
  category: "vape" | "gummies" | "cart";
  potencyMg: number;
  count?: number; // pieces for gummies
  flavor?: string;
  image: string; // image URL
};

export const products: Product[] = [
  {
    slug: "dream-vape-pen-950mg",
    sku: "DREAM-950",
    name: "Dream Vape Pen – 950mg Delta-8",
    description: "Smooth and fast-acting. Perfect for late nights or creative mornings.",
    price: 35,
    category: "vape",
    potencyMg: 950,
    flavor: "Neutral",
    image: "https://placehold.co/600x600?text=Vape"
  },
  {
    slug: "chill-gummies-25mg-20",
    sku: "CHILL-25x20",
    name: "Chill Gummies – 25mg x 20 pieces",
    description: "Delicious and discreet Delta-8 gummies. Your go-to evening relaxer.",
    price: 40,
    category: "gummies",
    potencyMg: 25,
    count: 20,
    flavor: "Assorted",
    image: "https://placehold.co/600x600?text=Gummies"
  },
  {
    slug: "focus-cartridge-1g",
    sku: "FOCUS-1G",
    name: "Focus Cartridge – 1g Premium Blend",
    description: "Sleek cart with ultra-pure extract. Designed for mental clarity and mood.",
    price: 30,
    category: "cart",
    potencyMg: 1000,
    flavor: "Citrus",
    image: "https://placehold.co/600x600?text=Cart"
  }
];

export const featuredSlugs = ["dream-vape-pen-950mg", "chill-gummies-25mg-20"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
