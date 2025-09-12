export default function Page() {
  return (
    <section className="section">
      <h1>Payment & Shipping</h1>
      <p>Here’s how checkout works and what to expect for delivery.</p>
      <h2>Payment</h2>
      <ul>
        <li>Secure checkout processed by our payment partners.</li>
        <li>Charges appear with a neutral billing descriptor.</li>
        <li>We do not store full card details on our servers.</li>
      </ul>
      <h2>Shipping</h2>
      <ul>
        <li>Orders ship Monday–Friday; orders after cutoff ship next business day.</li>
        <li>Tracking is emailed at dispatch.</li>
        <li>Typical delivery windows are 2–5 business days by region.</li>
      </ul>
      <p>
        For refund and return policy, see <a href="/shipping-returns">Shipping & Returns</a> and <a href="/refunds">Refunds</a>.
      </p>
    </section>
  );
}

