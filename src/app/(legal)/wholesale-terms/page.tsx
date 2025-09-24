export const metadata = {
  title: "Wholesale Shipping & Returns",
  description: "Terms for wholesale logistics, lead times, and claims."
};

export default function WholesaleTerms() {
  return (
    <section className="section prose max-w-none">
      <h1>Wholesale Shipping &amp; Returns</h1>
      <p className="lede">Terms applicable to palletized and case-pack wholesale orders.</p>

      <h2>Order Acceptance</h2>
      <ul>
        <li>Purchase orders are subject to compliance verification (state eligibility, licensing, and payment history).</li>
        <li>Inventory is reserved upon written confirmation; quotes expire in 7 calendar days.</li>
        <li>MOQ: as listed per SKU. Partial cases may incur a repack fee.</li>
      </ul>

      <h2>Lead Times &amp; Fulfillment</h2>
      <ul>
        <li>Parcel &lt; 75 lbs: 1–2 business days after payment.</li>
        <li>Pallet/LTL: 2–4 business days to stage; allow additional transit based on carrier.</li>
        <li>White-label or custom formulation: lead time quoted separately.</li>
      </ul>

      <h2>Freight Terms</h2>
      <ul>
        <li>FOB origin. Freight collect or prepaid + add, depending on account preference.</li>
        <li>Adult signature required on all intoxicating products.</li>
        <li>International customers are responsible for duties, taxes, and import permits.</li>
      </ul>

      <h2>Damage &amp; Claims</h2>
      <ul>
        <li>Inspect shipments immediately. Note visible damage on the BOL before signing.</li>
        <li>Submit concealed damage claims within 48 hours with photos of packaging and lot numbers.</li>
        <li>Approved claims result in replacement product or credit memo; refunds issued at our discretion.</li>
      </ul>

      <h2>Returns</h2>
      <ul>
        <li>Unopened wholesale cases may be returnable within 10 days with RMA approval.</li>
        <li>Opened consumables, custom formulations, and private label goods are non-returnable.</li>
        <li>Return freight is the buyer’s responsibility unless the error is ours.</li>
      </ul>

      <h2>Payment Terms</h2>
      <ul>
        <li>ACH / wire required for initial orders. Net terms available on approval.</li>
        <li>Crypto payments (USDT/USDC ERC-20) must include invoice number in memo.</li>
        <li>Past-due balances accrue 1.5% monthly finance charge.</li>
      </ul>

      <h2>Force Majeure</h2>
      <p>
        We are not liable for delays caused by events beyond reasonable control (regulatory action, carrier disruption, natural
        disasters). Affected shipments will be rescheduled as soon as practicable.
      </p>

      <p className="text-sm text-gray-600">Questions? Email <a href="mailto:logistics@d8.example">logistics@d8.example</a>.</p>
    </section>
  );
}
