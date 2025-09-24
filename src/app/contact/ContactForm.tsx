"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [hp, setHp] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hp) return;
    setSent(true);
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <input type="text" placeholder="Name" className="w-full border p-2" required />
      <input type="email" placeholder="Email" className="w-full border p-2" required />
      <input type="text" placeholder="Company" className="w-full border p-2" required />
      <textarea placeholder="How can we help?" className="w-full border p-2" rows={5}></textarea>
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" className="bg-black px-4 py-2 text-white">
        Send
      </button>
      {sent && <p className="text-sm text-emerald-700">Thanks — we’ll reply shortly.</p>}
    </form>
  );
}

