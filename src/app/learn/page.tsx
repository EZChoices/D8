import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn About THCA Wholesale",
  description: "Education on THCA flower, concentrates, compliance, and merchandising for licensed buyers."
};

export default function Page() {
  return (
    <section className="section">
      <h1 className="text-4xl font-bold">Learn About THCA</h1>
      <p>
        Explore the fundamentals of THCA, compliance considerations for wholesale accounts, and best practices for merchandising
        COA-backed products. Resources link directly to documentation, lab results, and policy updates.
      </p>
      <ul>
        <li>THCA vs. delta-9: chemistry &amp; handling</li>
        <li>Compliance checklist for each state</li>
        <li>Retail readiness: packaging, labeling, and storage</li>
      </ul>
    </section>
  );
}

