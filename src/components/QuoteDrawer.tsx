"use client";

import React, { useEffect, useMemo, useState } from "react";
import { isCategoryAllowedInState, isD2CBlockedCategory, getStateRule } from "@/data/stateRules";
import type { QuoteItem, QuotePayload, BusinessInfo, ShippingInfo } from "@/types/quote";
import { track, trackError } from "@/lib/analytics";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialItems?: QuoteItem[];
  userIsWholesaleVerified?: boolean;
  initialShippingState?: string | null;
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL",
  "GA","HI","IA","ID","IL","IN","KS","KY","LA","MA",
  "MD","ME","MI","MN","MO","MS","MT","NC","ND","NE",
  "NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function QuoteDrawer({
  isOpen,
  onClose,
  initialItems = [],
  userIsWholesaleVerified,
  initialShippingState
}: Props) {
  const [items, setItems] = useState<QuoteItem[]>(initialItems);
  const [business, setBusiness] = useState<BusinessInfo>({
    businessName: "",
    contactName: "",
    email: ""
  });
  const [shipping, setShipping] = useState<ShippingInfo>({
    state: initialShippingState || "",
    country: "US"
  });
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setItems(initialItems);
    }
  }, [initialItems, isOpen]);

  useEffect(() => {
    if (initialShippingState && (!shipping.state || !isOpen)) {
      setShipping((s) => ({ ...s, state: initialShippingState }));
    }
  }, [initialShippingState, isOpen, shipping.state]);

  const stateRule = useMemo(() => getStateRule(shipping.state), [shipping.state]);

  const restrictions = useMemo(() => {
    const failed: { item: QuoteItem; reason: string }[] = [];
    for (const it of items) {
      const { allowed, rule } = isCategoryAllowedInState(shipping.state, it.category);
      if (!allowed) {
        failed.push({
          item: it,
          reason: rule?.reason || "Restricted category"
        });
      }
      if (!userIsWholesaleVerified && isD2CBlockedCategory(it.category)) {
        failed.push({
          item: it,
          reason: "ENDS products (vapes/carts) require verified wholesale account"
        });
      }
    }
    return failed;
  }, [items, shipping.state, userIsWholesaleVerified]);

  function updateQty(index: number, qty: number) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: Math.max(1, Math.floor(qty)) };
      return next;
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function submitQuote() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!business.businessName || !business.contactName || !validateEmail(business.email)) {
      setErrorMsg("Please fill required fields: Business name, Contact name, valid Email.");
      return;
    }
    if (!shipping.state) {
      setErrorMsg("Please select a shipping state.");
      return;
    }
    if (!items.length) {
      setErrorMsg("Please add at least one item.");
      return;
    }

    const payload: QuotePayload = {
      business,
      shipping,
      items,
      message,
      userIsWholesaleVerified: !!userIsWholesaleVerified,
      createdAtISO: new Date().toISOString()
    };

    track("quote_submitted_attempt", { items: items.length, state: shipping.state });

    try {
      setSubmitting(true);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Quote submission failed (HTTP ${res.status})`);
      }
      setSuccessMsg("Your quote was submitted. Our team will get back to you shortly.");
      track("quote_submitted", { items: items.length, state: shipping.state });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit quote.");
      trackError("quote_submit_error", err, { state: shipping.state });
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Wholesale Quote" className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold">Wholesale Quote</h2>
            <button onClick={onClose} aria-label="Close quote panel" className="rounded p-2 hover:bg-gray-100">
              ✕
            </button>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium">Shipping State *</label>
            <select
              className="mt-1 w-full rounded border px-3 py-2"
              value={shipping.state}
              onChange={(e) =>
                setShipping((s) => ({
                  ...s,
                  state: e.target.value
                }))
              }
            >
              <option value="">Select a state…</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {stateRule && (
              <div className="mt-2 rounded border px-3 py-2 text-sm">
                <div>
                  <strong>Status:</strong> {stateRule.status}
                </div>
                <div>
                  <strong>Note:</strong> {stateRule.reason}
                </div>
                <div className="text-gray-500">
                  <strong>Updated:</strong> {stateRule.updated}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Items</h3>
            {items.length === 0 ? (
              <p className="mt-2 text-sm text-gray-600">No items yet. Add from the catalog page.</p>
            ) : (
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Product</th>
                    <th>Pack</th>
                    <th>Qty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={`${it.productId}-${i}`} className="border-b">
                      <td className="py-2">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-gray-600">{it.category}</div>
                      </td>
                      <td>{it.pack}</td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          className="w-20 rounded border px-2 py-1"
                          value={it.quantity}
                          onChange={(e) => updateQty(i, Number(e.target.value))}
                          aria-label={`Quantity for ${it.name}`}
                        />
                      </td>
                      <td>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => removeItem(i)}
                          aria-label={`Remove ${it.name}`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <h3 className="font-medium">Business Details</h3>

            <label className="block text-sm">
              Business Name *
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={business.businessName}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    businessName: e.target.value
                  }))
                }
                required
              />
            </label>

            <label className="block text-sm">
              Contact Name *
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={business.contactName}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    contactName: e.target.value
                  }))
                }
                required
              />
            </label>

            <label className="block text-sm">
              Email *
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={business.email}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    email: e.target.value
                  }))
                }
                required
                aria-invalid={Boolean(business.email) && !validateEmail(business.email)}
              />
            </label>

            <label className="block text-sm">
              Phone
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={business.phone || ""}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    phone: e.target.value
                  }))
                }
              />
            </label>

            <label className="block text-sm">
              Website
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={business.website || ""}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    website: e.target.value
                  }))
                }
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block text-sm">
                Resale Cert #
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={business.resaleCert || ""}
                  onChange={(e) =>
                    setBusiness((b) => ({
                      ...b,
                      resaleCert: e.target.value
                    }))
                  }
                />
              </label>

              <label className="block text-sm">
                EIN (optional)
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  value={business.ein || ""}
                  onChange={(e) =>
                    setBusiness((b) => ({
                      ...b,
                      ein: e.target.value
                    }))
                  }
                />
              </label>
            </div>

            <label className="block text-sm">
              Notes
              <textarea
                className="mt-1 w-full rounded border px-3 py-2"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>

          {restrictions.length > 0 && (
            <div className="mt-4 rounded border border-amber-400 bg-amber-50 p-3 text-sm">
              <strong>Heads up:</strong>
              <ul className="ml-5 list-disc">
                {restrictions.map((r, idx) => (
                  <li key={idx}>
                    <em>{r.item.name}</em>: {r.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
              onClick={submitQuote}
              disabled={submitting || items.length === 0}
            >
              {submitting ? "Submitting…" : "Submit Quote"}
            </button>
            <button className="rounded border px-4 py-2" onClick={onClose}>
              Cancel
            </button>
          </div>

          {errorMsg && (
            <div role="alert" className="mt-3 rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div role="status" className="mt-3 rounded border border-green-400 bg-green-50 p-3 text-sm text-green-700">
              {successMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
