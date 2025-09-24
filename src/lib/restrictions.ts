import { type Product } from "@/data/products";
import { getStateRule, stateRestrictsCategory, stateRules } from "@/data/stateRules";

export const RESTRICTED_STATES = stateRules.filter((rule) => rule.status !== "ok").map((rule) => rule.code);

export function stateBlocksProduct(state: string | null | undefined, product: Product) {
  if (!state) return false;
  const rule = getStateRule(state);
  return stateRestrictsCategory(rule, product.category);
}

export function getStateRestrictionDetails(state: string | null | undefined, product?: Product) {
  if (!state) return null;
  const rule = getStateRule(state);
  const blocked = product ? stateRestrictsCategory(rule, product.category) : rule.status !== "ok";
  return { rule, blocked };
}
