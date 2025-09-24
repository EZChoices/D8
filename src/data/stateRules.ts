export type ShippingStatus = "ok" | "restricted" | "no_ship";

export type StateRule = {
  code: string;
  status: ShippingStatus;
  restrictedCategories: string[];
  reason: string;
  updatedAt: string;
  note?: string;
};

const STATE_CODES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","DC","WA","WV","WI","WY"
] as const;

const DEFAULT_REASON =
  "Permits hemp-derived cannabinoids with <0.3% Δ9 THC under the 2018 Farm Bill. Confirm municipal rules prior to resale.";
const DEFAULT_UPDATED = "2025-02-10";

const OVERRIDES: Partial<Record<(typeof STATE_CODES)[number], Partial<StateRule>>> = {
  AK: {
    status: "restricted",
    restrictedCategories: ["Hemp Flower", "Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Alaska requires in-state licensing for inhalable hemp derivatives and limits shipment by air freight.",
    note: "Only ship ingestibles or topicals to Alaska partners once documentation is cleared."
  },
  HI: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables"],
    reason: "Hawaii restricts import of inhalable hemp hardware pending Department of Health guidance.",
    note: "Edibles and topicals remain eligible with adult-signature service."
  },
  ID: {
    status: "no_ship",
    restrictedCategories: ["ALL"],
    reason: "Idaho prohibits hemp-derived THC isomers regardless of delta-9 concentration.",
    note: "Orders to Idaho are automatically declined."
  },
  IA: {
    status: "restricted",
    restrictedCategories: ["ALL"],
    reason: "Iowa Attorney General guidance bans intoxicating hemp cannabinoids for commerce.",
    note: "Serve Iowa partners with CBD-only catalog variants."
  },
  NE: {
    status: "restricted",
    restrictedCategories: ["Hemp Flower", "Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Nebraska limits inhalable hemp goods to licensed medical channels.",
    note: "Offer only ingestible SKUs with certificate of compliance."
  },
  NY: {
    status: "restricted",
    restrictedCategories: ["ALL"],
    reason: "New York bans the sale of hemp-derived products with intoxicating cannabinoids to consumers.",
    note: "Route wholesale customers through NY cannabinoid permit holders only."
  },
  MN: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Minnesota allows low-dose edibles only; inhalable products require cannabis program licensing.",
    note: "Ship finished goods ≤10 mg serving only."
  },
  OR: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Oregon OLCC prohibits artificially derived THC products in general retail.",
    note: "Bulk THCA flower permissible with documentation; confirm buyer license."
  },
  RI: {
    status: "restricted",
    restrictedCategories: ["ALL"],
    reason: "Rhode Island statute classifies Delta-8/THCA products alongside controlled substances.",
    note: "Only non-intoxicating hemp ingredients may ship to RI."
  },
  UT: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables"],
    reason: "Utah requires product registration and bans disposable vape hardware containing THC isomers.",
    note: "Offer capsules, tinctures, or topicals only once registered."
  },
  VT: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Vermont limits hemp-derived inhalable goods to licensed adult-use operators.",
    note: "Coordinate with vertically integrated licensees for inhalables."
  },
  WA: {
    status: "restricted",
    restrictedCategories: ["Vape Carts", "Disposables", "Concentrate Wax"],
    reason: "Washington LCB restricts Delta-8 and THCA concentrates from general commerce.",
    note: "Channel only through licensed processors."
  }
};

export const stateRules: StateRule[] = STATE_CODES.map((code) => {
  const base: StateRule = {
    code,
    status: "ok",
    restrictedCategories: [],
    reason: DEFAULT_REASON,
    updatedAt: DEFAULT_UPDATED
  };
  const override = OVERRIDES[code];
  if (!override) return base;
  return {
    ...base,
    ...override,
    restrictedCategories: override.restrictedCategories ?? base.restrictedCategories,
    reason: override.reason ?? base.reason,
    updatedAt: override.updatedAt ?? base.updatedAt ?? DEFAULT_UPDATED
  };
});

export const stateRuleMap = new Map(stateRules.map((rule) => [rule.code, rule]));

export function getStateRule(code: string): StateRule {
  return stateRuleMap.get(code.toUpperCase()) ?? {
    code: code.toUpperCase(),
    status: "ok",
    restrictedCategories: [],
    reason: DEFAULT_REASON,
    updatedAt: DEFAULT_UPDATED
  };
}

export function stateRestrictsCategory(rule: StateRule, category: string) {
  if (rule.status === "no_ship") return true;
  if (!rule.restrictedCategories.length) return false;
  if (rule.restrictedCategories.includes("ALL")) return true;
  return rule.restrictedCategories.includes(category);
}

export { STATE_CODES };
