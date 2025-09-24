"use client";
import { useMemo, useState } from "react";
import { useShipping } from "@/components/ShippingContext";
import { addShippingInfo } from "@/lib/ga";
import { STATE_CODES, getStateRule } from "@/data/stateRules";

const STATUS_LABEL: Record<string, string> = {
  ok: "Permitted",
  restricted: "Restricted",
  no_ship: "Unavailable"
};

export default function StateSelector({ showGrid = true }: { showGrid?: boolean }) {
  const { state, setState } = useShipping();
  const [selected, setSelected] = useState<string | null>(state);
  const activeRule = selected ? getStateRule(selected) : state ? getStateRule(state) : null;
  const description = useMemo(() => {
    if (!activeRule) return null;
    const summary = activeRule.note ? `${activeRule.reason} ${activeRule.note}` : activeRule.reason;
    return `${STATUS_LABEL[activeRule.status]} — ${summary}`;
  }, [activeRule]);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <label htmlFor="state-selector" className="sr-only">
          Select shipping state
        </label>
        <select
          id="state-selector"
          value={selected || ""}
          onChange={(e) => setSelected(e.target.value || null)}
          className="rounded border px-2 py-1"
        >
          <option value="">Select state…</option>
          {STATE_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <button
          className="rounded bg-black px-3 py-1 text-white"
          onClick={() => {
            setState(selected);
            if (selected) addShippingInfo({ state: selected, country: "US", tier: "standard" });
          }}
        >
          Save
        </button>
        {state && (
          <span className="text-sm text-gray-600">
            Current: {state} ({STATUS_LABEL[getStateRule(state).status]})
          </span>
        )}
      </div>
      {description ? (
        <p className="mb-3 text-sm text-gray-700" aria-live="polite">
          {description} (Updated {activeRule?.updatedAt})
        </p>
      ) : null}
      {showGrid && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {STATE_CODES.map((code) => {
            const rule = getStateRule(code);
            const tone =
              rule.status === "ok"
                ? "bg-emerald-50 border-emerald-200"
                : rule.status === "restricted"
                ? "bg-amber-50 border-amber-200"
                : "bg-red-50 border-red-200";
            return (
              <div key={code} className={`rounded border px-2 py-1 text-sm ${tone}`}>
                <div className="font-semibold">{code}</div>
                <div>{STATUS_LABEL[rule.status]}</div>
                <div className="mt-1 text-[11px] text-gray-600">{rule.reason}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
