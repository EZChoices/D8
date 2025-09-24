import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";

export async function POST(request: Request) {
  const body = await request.json();
  const { company, contactName, email, phone, state, notes, items } = body as {
    company?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    state?: string;
    notes?: string;
    items?: Array<{ slug: string; quantity: number }>;
  };

  if (!company || !contactName || !email || !state || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const blocked: string[] = [];
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) {
      blocked.push(`Unknown SKU ${item.slug}`);
      continue;
    }
    const gate = evaluatePurchaseGate(product, { state, wholesaleStatus: "guest" });
    if (!gate.canPurchase) {
      blocked.push(`${product.title}: ${gate.messages.join("; ") || "restricted"}`);
    }
  }

  if (blocked.length > 0) {
    return NextResponse.json({ error: "Restricted items", details: blocked }, { status: 422 });
  }

  console.log("Quote request", {
    company,
    contactName,
    email,
    phone,
    state,
    notes,
    items
  });

  return NextResponse.json({ message: "Quote request received. Compliance will follow up shortly." });
}
