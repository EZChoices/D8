import { type Product } from "@/data/products";
import {
  getStateRule,
  isCategoryAllowedInState,
  stateRules,
  type StateRuleEntry
} from "@/data/stateRules";
import type { ProductCategory } from "@/types/product";

export const RESTRICTED_STATES = stateRules
  .filter((rule) => rule.status !== "OK")
  .map((rule) => rule.code);

function normalizeCategory(product: Product): ProductCategory {
  const tags = product.compliance_tags || [];
  const lowerCategory = product.category.toLowerCase();
  if (tags.includes("flower") || lowerCategory.includes("flower")) return "flower";
  if (tags.includes("pre-roll") || lowerCategory.includes("pre roll")) return "pre-rolls";
  if (tags.includes("extract") || lowerCategory.includes("concentrate")) return "concentrates";
  if (lowerCategory.includes("distillate")) return "distillates";
  if (tags.includes("hardware") || lowerCategory.includes("hardware")) return "hardware";
  if (tags.includes("topical") || lowerCategory.includes("topical")) return "topicals";
  if (tags.includes("beverage") || lowerCategory.includes("beverage")) return "beverages";
  if (tags.includes("edible") || lowerCategory.includes("edible") || lowerCategory.includes("gummy")) return "edibles";
  if (tags.includes("ingestible")) return "ingestibles";
  if (tags.includes("inhalable") || lowerCategory.includes("vape")) return "vapes";
  return "services";
}

function getRuleDetails(state: string | null | undefined): StateRuleEntry | undefined {
  return state ? getStateRule(state) : undefined;
}

export function stateBlocksProduct(state: string | null | undefined, product: Product) {
  if (!state) return false;
  const category = normalizeCategory(product);
  const { allowed } = isCategoryAllowedInState(state, category);
  return !allowed;
}

export function getStateRestrictionDetails(state: string | null | undefined, product?: Product) {
  if (!state) return null;
  const rule = getRuleDetails(state);
  if (!rule) return null;
  if (!product) {
    return { rule, blocked: rule.status === "NoShip" };
  }
  const category = normalizeCategory(product);
  const { allowed } = isCategoryAllowedInState(state, category);
  return { rule, blocked: !allowed };
}
