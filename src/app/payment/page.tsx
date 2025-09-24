"use client";
import StateSelector from "@/components/StateSelector";

export default function Page() {
  return (
    <section className="section space-y-6">
      <header className="space-y-2">
        <h1>Payment &amp; Logistics</h1>
        <p className="text-gray-700">
          We operate on a wholesale request-for-quote workflow. Pricing is confirmed per batch after compliance review, then
          invoiced for ACH, wire, or crypto settlement.
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
          <li>ACH / domestic wire (preferred) — net terms available after three completed orders.</li>
          <li>USDT or USDC (ERC-20) — include your invoice number in the memo and email the TX hash for reconciliation.</li>
          <li>Cashier’s check / certified funds for local pickups (released after clearing at our bank).</li>
        </ul>
        <p className="text-xs text-gray-600">
          Card processing is unavailable for inhalable SKUs. Non-inhalable retail packs can be routed through our consumer
          checkout upon request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Shipping &amp; lead times</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Staging: 1–2 business days for parcel orders, 2–4 business days for pallets.</li>
          <li>Carriers: UPS, FedEx, regional LTL, or dedicated freight depending on weight and destination.</li>
          <li>Adult signature is required for all intoxicating products.</li>
          <li>International: we declare goods accurately (hemp extract / botanical ingredients). Buyer is responsible for import
            permits and local compliance.</li>
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
