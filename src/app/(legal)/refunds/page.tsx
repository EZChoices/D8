import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale THCA Refund Policy",
  description: "Refund eligibility for defective wholesale THCA shipments and how to initiate a claim."
};

export default function Refunds() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-bold">Wholesale THCA Refund Policy</h1>
      <p className="lede">If something goes wrong with a wholesale shipment, we correct it quickly and transparently.</p>
      <hr className="divider" />
      <p>
        Refunds or credits are issued only for defective or incorrect items documented within 7 days of delivery. Provide batch IDs,
        photos, and your purchase order so we can reconcile inventory and issue replacements or credits.
      </p>
    </div>
  );
}

