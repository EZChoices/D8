import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'content/products.json'), 'utf-8')
  );
  for (const p of data) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        sku: p.sku,
        name: p.name,
        description: p.description,
        priceCents: Math.round(p.price * 100),
        category: p.category,
        potencyMg: p.potencyMg,
        count: p.count ?? null,
        flavor: p.flavor ?? null,
        image: p.image,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
