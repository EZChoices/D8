"use client";
import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate Formspree or Resend/Postmark
    setSent(true);
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
        <button className="rounded bg-black px-4 py-2 text-white">Get updates</button>
      </form>
      {sent && <p className="mt-3 text-sm text-green-700">Thanks! You’re on the list.</p>}
    </div>
  );
}
