export default function Checkout() {
  return (
    <div className="section max-w-xl">
      <h1 className="text-3xl font-bold mb-3">Checkout (MVP)</h1>
      <p className="text-ink-400">
        This is a placeholder. Payment & order flow will connect later (Supabase/Stripe/crypto).
      </p>
      <div className="card p-6 mt-6">
        <p className="text-sm text-ink-300">
          For demo: cart summary, shipping estimate, and a mock address form here.
        </p>
      </div>
    </div>
  );
}
