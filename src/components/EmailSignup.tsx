"use client";
import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const payload = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: payload.error || "Unable to subscribe right now." });
      } else {
        setStatus({ type: "success", message: payload.message || "Check your inbox to confirm." });
        setEmail("");
      }
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Unexpected error." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded border p-4 mt-8">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full rounded border px-3 py-2"
        />
        <button
          className={`rounded px-4 py-2 text-white ${submitting ? "bg-gray-400" : "bg-black"}`}
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Get updates"}
        </button>
      </form>
      {status ? (
        <p
          className={`mt-3 text-sm ${
            status.type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </div>
  );
}
