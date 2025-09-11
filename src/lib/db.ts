import { PrismaClient } from '@prisma/client';
import { Product, products as fallbackProducts } from '@/data/products';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

function mapDbProduct(p: any): Product {
  return {
    id: p.id,
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    category: p.category,
    potencyMg: p.potencyMg,
    count: p.count ?? undefined,
    flavor: p.flavor ?? undefined,
    image: p.image,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany();
    if (!dbProducts.length) return fallbackProducts;
    return dbProducts.map(mapDbProduct);
  } catch {
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) return mapDbProduct(product);
  } catch {
    // ignore and use fallback
  }
  return fallbackProducts.find((p) => p.slug === slug) ?? null;
}
