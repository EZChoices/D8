import type { Metadata } from "next";
import StateSelector from "@/components/StateSelector";

export const metadata: Metadata = {
  title: "Wholesale THCA Payment & Logistics",
  description:
    "Understand how D8 invoices wholesale THCA orders via ACH, wire, or crypto and how freight is staged once compliance clears."
};

export default function Page() {
  return (
    <section className="section space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Wholesale THCA Payment &amp; Logistics</h1>
        <p className="text-gray-700">
          We operate on a wholesale request-for-quote workflow. Pricing is confirmed per batch after compliance review and issued
          on an invoice that references the corresponding COAs and pallet counts.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How invoicing works</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>Submit your business details and licensing via the wholesale form or approved partner portal.</li>
          <li>Compliance reviews state eligibility, product restrictions, and allocates inventory.</li>
          <li>We issue a digital invoice with line-item COAs, pallet counts, and freight options.</li>
          <li>Pay via ACH, domestic wire, or USDT/USDC (ERC-20). Crypto payments settle same day with on-chain confirmation.</li>
          <li>Once funds clear, we stage the shipment, apply tamper seals, and email BOL plus tracking.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Accepted payment methods</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Payment: ACH/Wire for initial orders; Net terms on approval.</li>
          <li>Crypto (USDT/USDC ERC‑20) accepted with invoice reference.</li>
          <li>We do not process consumer card payments for wholesale orders.</li>
        </ul>
        <p className="text-xs text-gray-600">
          Limited retail packs without inhalable hardware may be routed through the consumer checkout when compliance allows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Shipping &amp; lead times</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Staging: 1–2 business days for parcel orders, 2–4 business days for pallets.</li>
          <li>Carriers: UPS, FedEx, regional LTL, or dedicated freight depending on weight and destination.</li>
          <li>Adult signature is required for all intoxicating products.</li>
          <li>
            International: we use accurate commercial descriptions and comply with export rules. The buyer is responsible for
            local import compliance. Seized shipments cannot be refunded.
          </li>
        </ul>
        <p className="text-xs text-gray-600">
          Submit state to preview restrictions. We block SKUs that cannot legally enter a jurisdiction.
        </p>
        <div className="mt-2">
          <StateSelector showGrid={false} />
        </div>
      </section>

      <footer className="space-y-2 text-sm text-gray-600">
        <p>
          Need a line sheet or custom formulation? Email <a href="mailto:wholesale@d8.example" className="underline">wholesale@d8.example</a>
          with your license and intended volume.
        </p>
      </footer>
    </section>
  );
}
