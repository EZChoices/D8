"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [hp, setHp] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hp) return; // spam honeypot
    setSent(true);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input type="text" placeholder="Name" className="border p-2 w-full" required />
        <input type="email" placeholder="Email" className="border p-2 w-full" required />
        <textarea placeholder="Your message..." className="border p-2 w-full" rows={5}></textarea>
        {/* honeypot */}
        <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
        <button type="submit" className="bg-black text-white px-4 py-2">Send</button>
      </form>
      {sent && <p className="text-green-700 text-sm">Thanks — we’ll reply shortly.</p>}
    </div>
  );
}
