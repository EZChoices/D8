import type { Metadata } from "next";
import StateSelector from "@/components/StateSelector";
import USRegionsMap from "@/components/USRegionsMap";
import USSVGMap from "@/components/USSVGMap";
import InternationalList from "@/components/InternationalList";
import { stateRules } from "@/data/stateRules";

export const metadata: Metadata = {
  title: "Where We Ship",
  description:
    "Review state-by-state compliance rules and international availability for wholesale hemp-derived products."
};

export default function Page() {
  return (
    <section className="section">
      <h1>Where We Ship</h1>
      <p className="lede">
        Set your shipping state to check availability. Restricted SKUs are blocked automatically during checkout.
      </p>
      <div className="mb-6">
        <h2>United States</h2>
        <p className="text-sm text-gray-700">
          Select your state via the map or dropdown. The matrix below is driven by our compliance config and updated whenever
          statutes change.
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {/* Inline SVG map (loads /public/us-states.svg when available) */}
          <USSVGMap />
          <div>
            <StateSelector showGrid={true} />
            <div className="mt-4">
              <USRegionsMap />
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">State</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Reason</th>
                <th className="px-3 py-2 font-semibold">Last updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stateRules.map((rule) => (
                <tr key={rule.code} className="align-top">
                  <td className="px-3 py-2 font-medium">{rule.code}</td>
                  <td className="px-3 py-2">
                    {rule.status === "ok"
                      ? "Permitted"
                      : rule.status === "restricted"
                      ? "Restricted"
                      : "Unavailable"}
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    {rule.reason}
                    {rule.note ? <span className="block text-xs text-gray-500">{rule.note}</span> : null}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500">{rule.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <h2>International</h2>
        <p className="text-sm text-gray-700">
          We provide accurate commercial invoices (hemp extract / botanical ingredients) and HS codes. Importers are
          responsible for securing permits, paying duties, and complying with their local regulations. Shipments held by
          customs are the buyer’s responsibility.
        </p>
        <div className="mt-3">
          <InternationalList />
        </div>
      </div>
    </section>
  );
}
