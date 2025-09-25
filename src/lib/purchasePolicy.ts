import type { Product } from "@/data/products";
import { getStateRestrictionDetails } from "@/lib/restrictions";
import type { WholesaleStatus } from "@/components/WholesaleContext";

export type PurchaseGate = {
  canPurchase: boolean;
  requiresWholesale: boolean;
  restrictedByState: boolean;
  messages: string[];
};

export function productRequiresWholesale(product: Product) {
  const tags = product.tags || [];
  if (tags.includes("b2b_only")) return true;
  const channels = product.channels || [];
  return channels.length > 0 && channels.includes("wholesale") && !channels.includes("retail");
}

export function evaluatePurchaseGate(
  product: Product,
  {
    state,
    wholesaleStatus
  }: {
    state: string | null | undefined;
    wholesaleStatus: WholesaleStatus;
  }
): PurchaseGate {
  const messages: string[] = [];
  let canPurchase = true;
  const requiresWholesale = productRequiresWholesale(product);
  if (requiresWholesale && wholesaleStatus !== "approved") {
    canPurchase = false;
    messages.push("Wholesale verification required. Submit KYC to unlock pricing.");
  }

  const stateDetails = getStateRestrictionDetails(state, product);
  const restrictedByState = Boolean(stateDetails?.blocked);
  if (stateDetails) {
    if (stateDetails.blocked) {
      canPurchase = false;
      messages.push(`Not available for shipment to ${stateDetails.rule.code}: ${stateDetails.rule.reason}`);
    } else if (stateDetails.rule.status === "Restricted") {
      messages.push(`Note: ${stateDetails.rule.reason}`);
    }
  }

  return {
    canPurchase,
    requiresWholesale,
    restrictedByState,
    messages
  };
}
