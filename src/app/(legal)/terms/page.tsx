import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale THCA Terms & Conditions",
  description: "Key legal terms governing D8 wholesale THCA sales, compliance, and account responsibilities."
};

export default function Terms() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-bold">Wholesale THCA Terms &amp; Conditions</h1>
      <p className="lede">Plain-language expectations for wholesale buyers, compliance teams, and logistics partners.</p>
      <hr className="divider" />
      <p>
        Use of this site implies agreement with our wholesale policies. Products are for licensed businesses and adults 21+ only.
        By submitting a quote or purchase order you confirm state eligibility, maintain proper licensing, and accept responsibility
        for downstream compliance.
      </p>
    </div>
  );
}

