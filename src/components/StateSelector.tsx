"use client";
import { useState } from "react";
import { useShipping } from "@/components/ShippingContext";
import { RESTRICTED_STATES } from "@/lib/restrictions";

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

export default function StateSelector({ showGrid = true }: { showGrid?: boolean }) {
  const { state, setState } = useShipping();
  const [selected, setSelected] = useState<string | null>(state);
  const restricted = new Set(RESTRICTED_STATES);
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <select
          value={selected || ""}
          onChange={(e) => setSelected(e.target.value || null)}
          className="rounded border px-2 py-1"
        >
          <option value="">Select state…</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="rounded bg-black px-3 py-1 text-white" onClick={() => setState(selected)}>
          Save
        </button>
        {state && <span className="text-sm text-gray-600">Current: {state} {restricted.has(state) ? '(Restricted)' : ''}</span>}
      </div>
      {showGrid && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {STATES.map((s) => (
            <div key={s} className={`rounded border px-2 py-1 text-sm ${restricted.has(s) ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              {s} {restricted.has(s) ? '— Restricted' : '— OK'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

