"use client";

import { useState } from "react";
import { products } from "@/data/products";

export default function LabResultsPage() {
  const [q, setQ] = useState("");
  const rows = products.filter((p) => {
    const term = q.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) || p.batch_id.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Lab Results</h1>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by product or batch"
        className="border px-3 py-2 w-full max-w-md"
      />
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Batch ID</th>
              <th className="p-2 text-left">Potency</th>
              <th className="p-2 text-left">COA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.batch_id} className="border-b">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.batch_id}</td>
                <td className="p-2">{p.potency_mg}mg</td>
                <td className="p-2">
                  {p.coa_url ? (
                    <a href={p.coa_url} className="underline" target="_blank" rel="noopener noreferrer">
                      PDF
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

