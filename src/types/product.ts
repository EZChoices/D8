export type PackUnit =
  | "g"
  | "oz"
  | "lb"
  | "ea"
  | "ml"
  | "qp"
  | "hp"
  | "1000g";

export type ProductCategory =
  | "flower"
  | "pre-rolls"
  | "concentrates"
  | "distillates"
  | "vapes"
  | "carts"
  | "hardware"
  | "services"
  | "edibles"
  | "beverages"
  | "topicals"
  | "ingestibles";

export interface QuantityBreak {
  minQty: number;
  percentOff: number;
  label?: string;
}

export interface PriceTier {
  channel: "wholesale" | "retail";
  priceUSD: number;
  sizeLabel: string;
  unit: PackUnit;
  restrictedD2C?: boolean;
  qtyBreaks?: QuantityBreak[];
}

export interface Product {
  id: string;
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  name: string;
  variant?: string;
  strain?: string;
  notes?: string;
  images?: string[];
  b2b_only?: boolean;
  prices: PriceTier[];
  complianceTags?: string[];
  coaUrl?: string;
}
