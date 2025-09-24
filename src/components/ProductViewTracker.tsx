"use client";
import { useEffect } from "react";
import { viewItem } from "@/lib/ga";
import type { Product } from "@/data/products";

type Props = {
  product: Pick<Product, "slug" | "title" | "category" | "price_cents">;
};

export default function ProductViewTracker({ product }: Props) {
  useEffect(() => {
    viewItem({
      id: product.slug,
      name: product.title,
      category: product.category,
      price: product.price_cents / 100,
    });
  }, [product.slug, product.title, product.category, product.price_cents]);

  return null;
}
