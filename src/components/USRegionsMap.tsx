"use client";
import { useShipping } from "@/components/ShippingContext";
import { getStateRule } from "@/data/stateRules";

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
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {Object.entries(REGIONS).map(([region, codes]) => (
        <div key={region}>
          <div className="mb-2 text-sm font-semibold">{region}</div>
            <div className="grid grid-cols-3 gap-1 text-sm">
              {codes.map((code) => {
                const rule = getStateRule(code);
                const tone =
                  state === code
                    ? "bg-black text-white"
                    : rule?.status === "NoShip"
                    ? "bg-red-100 border-red-300"
                    : rule?.status === "Restricted"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-emerald-50 border-emerald-200";
                return (
                  <button
                    key={code}
                    onClick={() => setState(code)}
                    className={`rounded border px-2 py-1 text-left ${tone}`}
                    aria-label={`Set shipping state ${code}`}
                    aria-disabled={rule?.status === "NoShip"}
                    disabled={rule?.status === "NoShip"}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
        </div>
      ))}
    </div>
  );
}

