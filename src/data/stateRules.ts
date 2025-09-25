import type { ProductCategory } from "@/types/product";

export type StateStatus = "OK" | "Restricted" | "NoShip";

export interface StateRule {
  status: StateStatus;
  updated: string;
  reason: string;
  disallowCategories?: ProductCategory[];
}

const DEFAULT_RULE: StateRule = {
  status: "OK",
  reason: "No statewide restrictions recorded. Confirm municipal rules prior to shipment.",
  updated: "2025-02-10"
};

export const STATE_CODES = [
  "AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL",
  "GA","HI","IA","ID","IL","IN","KS","KY","LA","MA",
  "MD","ME","MI","MN","MO","MS","MT","NC","ND","NE",
  "NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
] as const;

type StateRuleRecord = Record<string, StateRule>;

export const STATE_RULES: StateRuleRecord = {
  ID: {
    status: "Restricted",
    reason: "State rules for intoxicating hemp products; confirm THCA/ENDS policies.",
    updated: "2025-09-24",
    disallowCategories: ["vapes", "carts"]
  },
  SD: {
    status: "Restricted",
    reason: "State rules for intoxicating hemp products; confirm THCA/ENDS policies.",
    updated: "2025-09-24",
    disallowCategories: ["vapes", "carts"]
  },
  CA: {
    status: "Restricted",
    reason: "In-state enforcement regarding intoxicating hemp; confirm specific SKU allowances.",
    updated: "2025-09-24"
  },
  TX: {
    status: "Restricted",
    reason: "Regulatory changes in progress; confirm ENDS and THCA policies.",
    updated: "2025-09-24",
    disallowCategories: ["vapes", "carts"]
  }
};

export const D2C_BLOCKED_CATEGORIES: ProductCategory[] = ["vapes", "carts"];

export interface StateRuleEntry extends StateRule {
  code: string;
}

export const stateRules: StateRuleEntry[] = STATE_CODES.map((code) => ({
  code,
  ...(STATE_RULES[code] ?? DEFAULT_RULE)
}));

export function getStateRule(stateCode?: string): StateRuleEntry | undefined {
  if (!stateCode) return undefined;
  const code = stateCode.toUpperCase().trim();
  const rule = STATE_RULES[code] ?? DEFAULT_RULE;
  return { code, ...rule };
}

export function isCategoryAllowedInState(
  stateCode: string | undefined,
  category: ProductCategory
): { allowed: boolean; rule?: StateRuleEntry } {
  const rule = getStateRule(stateCode);
  if (!rule) return { allowed: true, rule };
  if (rule.status === "NoShip") return { allowed: false, rule };
  if (rule.disallowCategories?.includes(category)) return { allowed: false, rule };
  return { allowed: true, rule };
}

export function isD2CBlockedCategory(category: ProductCategory): boolean {
  return D2C_BLOCKED_CATEGORIES.includes(category);
}
