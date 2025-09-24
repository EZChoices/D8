"use client";
import { useState } from "react";

type Entry = { code: string; name: string; status: "OK" | "Caution" | "Restricted" };

// Demo policy list — replace with your vetted policy later
const BASE_ENTRIES: Entry[] = [
  { code: "CA", name: "Canada", status: "Caution" },
  { code: "MX", name: "Mexico", status: "Caution" },
  { code: "GB", name: "United Kingdom", status: "OK" },
  { code: "DE", name: "Germany", status: "OK" },
  { code: "FR", name: "France", status: "OK" },
  { code: "IT", name: "Italy", status: "OK" },
  { code: "ES", name: "Spain", status: "OK" },
  { code: "AU", name: "Australia", status: "Caution" },
  { code: "NZ", name: "New Zealand", status: "OK" },
  { code: "AE", name: "UAE", status: "Restricted" },
  { code: "SA", name: "Saudi Arabia", status: "Restricted" },
  { code: "SG", name: "Singapore", status: "Restricted" },
  { code: "JP", name: "Japan", status: "Caution" }
];

export default function InternationalList() {
  const [q, setQ] = useState("");
  const rows = BASE_ENTRIES.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
  const badge = (s: Entry["status"]) =>
    s === "OK" ? "bg-green-50 border-green-200" : s === "Caution" ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";
  return (
    <div>
      <div className="mb-2 text-sm">
        Receiver is responsible for import permits, duties, and compliance with local regulations. We provide accurate customs
        declarations (hemp extract / botanical ingredients); mislabeling requests are declined.
      </div>
      <div className="mb-3 flex items-center gap-2">
        <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Search country" className="rounded border px-2 py-1" />
        <span className="text-xs text-gray-600">Statuses: OK = generally accepted; Caution = mixed/unclear; Restricted = high risk</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {rows.map((e) => (
          <div key={e.code} className={`rounded border px-2 py-2 ${badge(e.status)}`}>
            <div className="flex items-center justify-between">
              <strong>{e.name}</strong>
              <span className="text-xs">{e.status}</span>
            </div>
            <div className="mt-1 text-xs text-gray-600">Policy varies; receiver responsibility acknowledged at checkout.</div>
          </div>
        ))}
      </div>
    </div>
  );
}

