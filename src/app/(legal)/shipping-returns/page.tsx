export default function ShippingReturns() {
  return (
    <div className="prose max-w-none">
      <h1>Shipping &amp; Returns</h1>
      <p className="lede">We ship discreetly and quickly. Returns are limited due to product nature but we’ll make it right if anything arrives damaged.</p>
      <hr className="divider" />
      <p>
        Orders ship within 2 business days. Delivery time varies by region. Due to product nature, returns are limited to defective items.
      </p>
      <h2>Return Window & Eligibility</h2>
      <ul>
        <li>Report issues within 7 days of delivery with photos of packaging and product.</li>
        <li>Unopened consumables may be eligible for return within 14 days; opened consumables cannot be returned.</li>
        <li>Incorrect or defective items are replaced or refunded to the original payment method.</li>
      </ul>
      <h2>RMA Process</h2>
      <ol>
        <li>Contact support with order ID, photos, and description.</li>
        <li>Receive RMA instructions; do not ship without an RMA.</li>
        <li>Upon inspection, we issue replacement or refund.</li>
      </ol>
      <h2>Delivery Failures</h2>
      <ul>
        <li>Adult signature (21+) may be required for ENDS/vape products; missed signatures may incur re‑ship fees.</li>
        <li>We ship discreetly; the receiver is responsible for local compliance. Seized or refused shipments cannot be refunded.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MerchantReturnPolicy",
            "name": "Shipping & Returns",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 14,
            "returnMethod": "ReturnByMail",
            "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
            "itemCondition": "https://schema.org/NewCondition"
          })
        }}
      />
    </div>
  );
}

