import { wholesaleData, type WholesaleRawProduct } from "../../content/wholesale-data";

export type QuantityBreakKey = keyof typeof wholesaleData.quantity_breaks;
export type QuantityBreakRule = (typeof wholesaleData.quantity_breaks)[QuantityBreakKey][number];

export type WholesaleProduct = {
  id: string;
  category: string;
  subcategory: string;
  brand?: string | null;
  name: string;
  variant?: string | null;
  strain?: string | null;
  pack?: string | null;
  unit?: string | null;
  cost?: number | null;
  wsp?: number | null;
  msrp?: number | null;
  notes?: string;
  b2b_only?: boolean;
  qty_breaks_ref?: QuantityBreakKey;
};

export const quantityBreaks = wholesaleData.quantity_breaks;

export const wholesaleProducts: WholesaleProduct[] = wholesaleData.products.map((product: WholesaleRawProduct) => ({
  ...product,
}));

export const wholesaleCategories = Array.from(new Set(wholesaleProducts.map((p) => p.category)));

export function getWholesaleProduct(id: string) {
  return wholesaleProducts.find((p) => p.id === id);
}

function roundCurrency(value: number) {
  if (value >= 100) {
    return Math.round(value / 5) * 5;
  }
  return Math.round(value * 100) / 100;
}

export function getDiscountedBreaks(product: WholesaleProduct) {
  if (!product.qty_breaks_ref || !product.wsp) return [] as Array<QuantityBreakRule & { discounted_wsp: number }>;
  return quantityBreaks[product.qty_breaks_ref].map((rule) => ({
    ...rule,
    discounted_wsp: roundCurrency(product.wsp! * (1 - rule.percent_off / 100)),
  }));
}

export function formatCurrency(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return null;
  const hasCents = !Number.isInteger(value);
  return hasCents ? `$${value.toFixed(2)}` : `$${value.toLocaleString()}`;
}
