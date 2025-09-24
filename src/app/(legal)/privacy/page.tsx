import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale THCA Privacy Policy",
  description: "Understand how D8 handles wholesale account data, licensing documents, and compliance information."
};

export default function Privacy() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-bold">Wholesale THCA Privacy Policy</h1>
      <p className="lede">We collect only what we need to qualify accounts, ship compliant orders, and support your business.</p>
      <hr className="divider" />
      <p>
        Licensing documents, shipping contacts, and transaction history are stored securely and used solely to fulfill wholesale
        THCA orders or comply with regulatory audits. We do not sell or broker your information.
      </p>
    </div>
  );
}

