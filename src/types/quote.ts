import type { PackUnit, ProductCategory } from "./product";

export interface QuoteItem {
  productId: string;
  name: string;
  category: ProductCategory;
  pack: string;
  unit: PackUnit;
  quantity: number;
  notes?: string;
  priceUSD?: number;
}

export interface BusinessInfo {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  resaleCert?: string;
  ein?: string;
}

export interface ShippingInfo {
  state: string;
  city?: string;
  zip?: string;
  country?: string;
}

export interface QuotePayload {
  business: BusinessInfo;
  shipping: ShippingInfo;
  items: QuoteItem[];
  message?: string;
  utm?: Record<string, string>;
  userIsWholesaleVerified?: boolean;
  createdAtISO?: string;
}
