// === File: src/app/contact/page.tsx ===
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        e.currentTarget.reset();
      } else {
        setStatus({ type: "error", message: "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong." });
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">
            Your message...
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            className="border p-2 w-full"
            rows={5}
          ></textarea>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Send
        </button>
      </form>
      {status && (
        <p
          className={
            status.type === "success" ? "text-green-600" : "text-red-600"
          }
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
