import { NextResponse } from "next/server";
import type { QuotePayload, QuoteItem } from "@/types/quote";
import { isCategoryAllowedInState } from "@/data/stateRules";

const SEND_MODE = process.env.SEND_MODE || "console";

function escapeHtml(x: string) {
  return (x || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmailHTML(p: QuotePayload, blocked: QuoteItem[] = []) {
  const rows = p.items
    .map(
      (it) => `
    <tr><td>${escapeHtml(it.name)}</td><td>${escapeHtml(it.category)}</td><td>${escapeHtml(it.pack)}</td><td>${it.quantity}</td></tr>
  `
    )
    .join("");
  const blockedNote = blocked.length
    ? `<p><strong>Restricted:</strong> ${blocked.map((b) => escapeHtml(b.name)).join(", ")}</p>`
    : "";
  return `
    <div>
      <h2>Wholesale Quote Request</h2>
      <p><strong>Business:</strong> ${escapeHtml(p.business.businessName)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(p.business.contactName)} — ${escapeHtml(p.business.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(p.business.phone || "")}</p>
      <p><strong>Website:</strong> ${escapeHtml(p.business.website || "")}</p>
      <p><strong>Resale Cert:</strong> ${escapeHtml(p.business.resaleCert || "")}</p>
      <p><strong>EIN:</strong> ${escapeHtml(p.business.ein || "")}</p>
      <p><strong>Ship to:</strong> ${escapeHtml(p.shipping.state)} ${escapeHtml(p.shipping.city || "")} ${escapeHtml(p.shipping.zip || "")}</p>
      ${blockedNote}
      ${p.message ? `<p><strong>Notes:</strong> ${escapeHtml(p.message)}</p>` : ""}
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr><th>Product</th><th>Category</th><th>Pack</th><th>Qty</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p><small>Submitted: ${escapeHtml(p.createdAtISO || new Date().toISOString())}</small></p>
    </div>
  `;
}

async function sendEmail(payload: QuotePayload, blocked: QuoteItem[] = []) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!key || !from || !to) throw new Error("RESEND_API_KEY, RESEND_FROM, RESEND_TO required");

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const html = renderEmailHTML(payload, blocked);

  await resend.emails.send({
    from,
    to,
    subject: `Wholesale Quote — ${payload.business.businessName} (${payload.shipping.state})`,
    html
  });
}

async function sendAirtable(payload: QuotePayload, blocked: QuoteItem[] = []) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Quotes";
  if (!apiKey || !baseId) throw new Error("AIRTABLE_API_KEY and AIRTABLE_BASE_ID required");

  const { default: Airtable } = await import("airtable");
  const base = new Airtable({ apiKey }).base(baseId);

  const items = payload.items.map((i) => `${i.name} | ${i.pack} x${i.quantity}`).join("\n");

  await base(tableName).create([
    {
      fields: {
        Business: payload.business.businessName,
        Contact: payload.business.contactName,
        Email: payload.business.email,
        Phone: payload.business.phone || "",
        Website: payload.business.website || "",
        ResaleCert: payload.business.resaleCert || "",
        EIN: payload.business.ein || "",
        State: payload.shipping.state,
        City: payload.shipping.city || "",
        Zip: payload.shipping.zip || "",
        Items: items,
        Message: payload.message || "",
        Blocked: blocked.map((b) => b.name).join(", "),
        CreatedAt: payload.createdAtISO || new Date().toISOString()
      }
    }
  ]);
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as QuotePayload;

    if (!payload.business?.businessName || !payload.business?.contactName || !payload.business?.email) {
      return NextResponse.json({ error: "Missing required business fields." }, { status: 400 });
    }
    if (!payload.shipping?.state) {
      return NextResponse.json({ error: "Missing shipping state." }, { status: 400 });
    }
    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 });
    }

    const blocked: QuoteItem[] = [];
    for (const it of payload.items) {
      const { allowed } = isCategoryAllowedInState(payload.shipping.state, it.category);
      if (!allowed) blocked.push(it);
    }

    if (SEND_MODE === "email") await sendEmail(payload, blocked);
    else if (SEND_MODE === "airtable") await sendAirtable(payload, blocked);
    else console.log("[QUOTE]", JSON.stringify({ payload, blocked }, null, 2));

    return NextResponse.json({ ok: true, blocked: blocked.map((b) => b.productId) });
  } catch (err) {
    console.error("[QUOTE] error", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
