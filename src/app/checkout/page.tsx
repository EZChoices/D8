"use client";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/CartContext";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { getProduct, formatPrice } from "@/data/products";
import { STATE_CODES } from "@/data/stateRules";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export default function CheckoutPage({ searchParams }: { searchParams: { sku?: string; qty?: string } }) {
  const { items, clear } = useCart();
  const { state, setState } = useShipping();
  const { status } = useWholesale();
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const enriched = useMemo(() => {
    return items.map((item) => {
      const product = getProduct(item.slug);
      const gate = product
        ? evaluatePurchaseGate(product, { state, wholesaleStatus: status })
        : { canPurchase: true, requiresWholesale: false, restrictedByState: false, messages: [] };
      return { ...item, product, gate };
    });
  }, [items, state, status]);

  const blocked = enriched.filter((line) => !line.gate.canPurchase);
  const subtotal = items.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);
  const cartEmpty = items.length === 0;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResult(null);
    if (cartEmpty) {
      setResult({ type: "error", message: "Cart is empty." });
      return;
    }
    if (!state) {
      setResult({ type: "error", message: "Select a destination state." });
      return;
    }
    if (blocked.length > 0) {
      setResult({ type: "error", message: "Resolve restricted items before submitting." });
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contactName,
          email,
          phone,
          state,
          notes,
          items: enriched.map((line) => ({ slug: line.slug, quantity: line.quantity }))
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        setResult({ type: "error", message: payload.error || "Unable to submit request." });
      } else {
        setResult({ type: "success", message: payload.message || "Quote request submitted." });
        clear();
      }
    } catch (error: any) {
      setResult({ type: "error", message: error?.message || "Unexpected error." });
    } finally {
      setSubmitting(false);
    }
  };

  const quoteFromProduct = searchParams?.sku ? getProduct(searchParams.sku) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Request Wholesale Quote</h1>
      <p className="text-sm text-gray-600">
        Provide your business details and destination state. We will review compliance, prepare a freight estimate, and invoice
        approved orders for ACH or crypto settlement.
      </p>

      {quoteFromProduct ? (
        <div className="rounded border p-4 text-sm">
          <h2 className="text-lg font-semibold">Fast quote</h2>
          <p className="text-gray-700">
            You selected <strong>{quoteFromProduct.title}</strong>. Add it to your cart to include in the quote request.
          </p>
        </div>
      ) : null}

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold">Cart Summary</h2>
        {cartEmpty ? (
          <p className="text-sm text-gray-600">No items in cart. Add wholesale SKUs before submitting.</p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            {enriched.map((line) => (
              <div key={line.slug} className="rounded border px-3 py-2">
                <div className="font-medium">{line.title}</div>
                <div className="text-xs text-gray-600">
                  Qty: {line.quantity} · Unit: {formatPrice(line.price_cents)} · Subtotal: {formatPrice(line.price_cents * line.quantity)}
                </div>
                {line.gate.messages.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
                    {line.gate.messages.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="text-right text-sm font-semibold">
              Estimated subtotal: {formatPrice(subtotal)}
            </div>
          </div>
        )}
      </section>

      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
        <h2 className="text-lg font-semibold">Business details</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Company / DBA
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Contact name
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
        </div>
        <div className="text-sm">
          <label className="font-semibold">Destination state</label>
          <div className="mt-1 flex items-center gap-2">
            <select
              value={state || ""}
              onChange={(e) => setState(e.target.value || null)}
              required
              className="rounded border px-3 py-2"
            >
              <option value="">Select…</option>
              {STATE_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-600">We verify compliance before shipping.</span>
          </div>
        </div>
        <label className="text-sm">
          Notes (licensing, delivery windows, pallet preferences)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        {result ? (
          <div
            className={`rounded border px-3 py-2 text-sm ${
              result.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {result.message}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={submitting || cartEmpty}
          className={`rounded px-4 py-2 text-sm font-semibold text-white ${
            submitting || cartEmpty ? "cursor-not-allowed bg-gray-400" : "bg-black"
          }`}
        >
          {submitting ? "Submitting…" : "Submit quote request"}
        </button>
      </form>

      <section className="rounded border p-4 text-xs text-gray-600">
        <p>
          After approval, invoices are payable via ACH, wire, or ERC-20 stablecoins. Crypto remittance address is issued per
          invoice for reconciliation. Shipping labels and COAs are attached once payment clears.
        </p>
      </section>
    </div>
  );
}
