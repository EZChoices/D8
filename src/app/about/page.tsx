import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About D8 Wholesale THCA",
  description: "Learn how D8 sources and stages THCA flower and concentrates exclusively for licensed wholesale buyers."
};

export default function About() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">About D8 Wholesale THCA</h1>
      <p>
        We source, process, and stage THCA flower and concentrates for licensed buyers who need predictable quality and transparent
        documentation. No middlemen—just vetted partners and direct fulfillment.
      </p>
      <p>
        Our team focuses on wholesale readiness: compliance reviews, pallet staging, and batch-level COAs so your retail partners or
        manufacturing lines can move quickly. Retail is secondary and limited to compliant ingestibles.
      </p>
    </div>
  );
}
