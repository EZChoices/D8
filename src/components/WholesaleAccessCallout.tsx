"use client";
import { FormEvent, useState } from "react";
import { useWholesale } from "@/components/WholesaleContext";

export default function WholesaleAccessCallout() {
  const { status, requestAccess, unlockWithCode } = useWholesale();
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: business, email, message })
      });
      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.error || "Unable to submit");
      }
      requestAccess();
      setResult("Application received. Compliance will follow up within one business day.");
      setBusiness("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnlock = () => {
    if (!code.trim()) return;
    const ok = unlockWithCode(code);
    if (!ok) {
      setError("Invalid access code");
    } else {
      setError(null);
      setResult("Wholesale pricing unlocked for this session.");
    }
  };

  return (
    <div className="rounded border p-4 text-sm">
      <h2 className="text-lg font-semibold">Wholesale access</h2>
      <p className="text-gray-700">
        {status === "approved"
          ? "You have unlocked wholesale pricing on this device."
          : status === "pending"
          ? "We received your application. A team member will reach out shortly."
          : "Submit your business credentials to unlock inhalable SKUs and wholesale pricing."}
      </p>
      {result ? <div className="mt-2 rounded border border-green-200 bg-green-50 p-2 text-green-700">{result}</div> : null}
      {error ? <div className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-red-700">{error}</div> : null}
      {status !== "approved" ? (
        <form onSubmit={handleSubmit} className="mt-3 grid gap-2 md:grid-cols-2">
          <label className="text-xs uppercase tracking-wide text-gray-600">
            Business / License name
            <input
              type="text"
              required
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1"
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-gray-600">
            Contact email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1"
            />
          </label>
          <label className="md:col-span-2 text-xs uppercase tracking-wide text-gray-600">
            Message (licenses, volume, timelines)
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1"
            />
          </label>
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              disabled={submitting}
              className={`rounded px-3 py-1 text-white ${submitting ? "bg-gray-400" : "bg-black"}`}
            >
              {submitting ? "Submitting…" : "Request access"}
            </button>
            <div className="text-xs text-gray-600">State licenses required before fulfillment.</div>
          </div>
        </form>
      ) : null}
      <div className="mt-4 border-t pt-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter approval code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-48 rounded border px-2 py-1"
          />
          <button type="button" onClick={handleUnlock} className="rounded border px-3 py-1 text-sm">
            Unlock
          </button>
        </div>
        <p className="mt-2 text-[11px] text-gray-500">
          Approved partners can unlock pricing via the code provided in your onboarding email. Codes store locally only.
        </p>
      </div>
    </div>
  );
}
