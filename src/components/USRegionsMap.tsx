"use client";
import { useShipping } from "@/components/ShippingContext";
import { RESTRICTED_STATES } from "@/lib/restrictions";

const REGIONS: Record<string, string[]> = {
  West: [
    "AK","WA","OR","CA","HI","NV","ID","MT","WY","UT","AZ","CO","NM"
  ],
  Midwest: [
    "ND","SD","NE","KS","MN","IA","MO","WI","IL","IN","MI","OH"
  ],
  South: [
    "OK","TX","AR","LA","MS","AL","GA","FL","SC","NC","TN","KY","WV","VA","DC"
  ],
  Northeast: [
    "PA","NY","VT","NH","ME","MA","RI","CT","NJ","DE","MD"
  ]
};

export default function USRegionsMap() {
  const { state, setState } = useShipping();
  const restricted = new Set(RESTRICTED_STATES);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {Object.entries(REGIONS).map(([region, codes]) => (
        <div key={region}>
          <div className="mb-2 text-sm font-semibold">{region}</div>
          <div className="grid grid-cols-3 gap-1 text-sm">
            {codes.map((code) => (
              <button
                key={code}
                onClick={() => setState(code)}
                className={`rounded border px-2 py-1 text-left ${
                  state === code
                    ? "bg-black text-white"
                    : restricted.has(code)
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
                aria-label={`Set shipping state ${code}`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

