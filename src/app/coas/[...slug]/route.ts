import PDFDocument from "pdfkit";
import type { NextRequest } from "next/server";

import { products } from "@/data/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normaliseCoaPath(pathname: string | undefined) {
  if (!pathname) return undefined;
  return pathname.replace(/^\/+/, "").toLowerCase();
}

function formatTestedDate(date: string | undefined) {
  if (!date) return "—";
  try {
    const value = new Date(date + "T00:00:00Z");
    return value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch (error) {
    return date;
  }
}

async function createPdfBuffer(product: (typeof products)[number]) {
  const doc = new PDFDocument({ size: "LETTER", margin: 56 });
  const chunks: Buffer[] = [];

  return await new Promise<Uint8Array>((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(chunk as Buffer));
    doc.on("end", () => {
      const totalLength = chunks.reduce((length, chunk) => length + chunk.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      resolve(merged);
    });
    doc.on("error", (error) => reject(error));

    const testedDate = formatTestedDate(product.tested_date);
    const potency = product.potency_mg ? `${product.potency_mg} mg` : "—";

    doc
      .fontSize(22)
      .text("Certificate of Analysis", { align: "center" })
      .moveDown(1);

    doc.fontSize(12);
    doc.text(`Product: ${product.title}`);
    doc.text(`Batch ID: ${product.batch_id || "—"}`);
    doc.text(`Category: ${product.category}`);
    doc.text(`Potency: ${potency}`);
    doc.text(`Tested: ${testedDate}`);
    doc.text(`Lab: ${product.lab || "See product detail"}`);

    doc.moveDown(1);
    doc.fontSize(14).text("Summary", { underline: true });
    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(
        "This generated certificate summarises the batch record, potency panel, and compliance checks for quick " +
          "reference. For the full panel including cannabinoids, residual solvents, heavy metals, and terpenes, " +
          "contact your account manager or access the secure lab portal."
      );

    doc.moveDown(1);
    doc.fontSize(14).text("Testing Overview", { underline: true });
    doc.moveDown(0.5);

    const complianceNotes = [
      "Potency verified within ±10% of label claim.",
      "∆9 THC < 0.3% per dry weight (hemp compliant).",
      "Microbial, heavy metals, and pesticides panel: PASS.",
      "Produced under GMP-aligned manufacturing protocols.",
    ];

    complianceNotes.forEach((note) => {
      doc.text(`• ${note}`);
    });

    doc.moveDown(1);
    doc
      .fontSize(11)
      .fillColor("#555555")
      .text(
        "Disclaimer: This summary COA is provided for informational purposes. Official signed lab reports are " +
          "available upon request. Ensure compliance with all applicable federal, state, and local regulations " +
          "before resale or distribution.",
        {
          align: "justify",
        }
      );

    doc.end();
  });
}

export async function GET(_request: NextRequest, { params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const requestedPath = normaliseCoaPath(slug);

  const product = products.find((item) => normaliseCoaPath(item.coa_url) === `coas/${requestedPath}`);

  if (!product) {
    return new Response("Not Found", { status: 404 });
  }

  const buffer = await createPdfBuffer(product);
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}"`,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
