import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact D8 Wholesale",
  description: "Reach the D8 wholesale THCA team for line sheets, compliance documentation, and account support."
};

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Contact D8 Wholesale</h1>
      <p>
        Tell us about your business, licensing, and the THCA products you’re sourcing. We reply within one business day and can
        prepare compliance packets on request.
      </p>
      <ContactForm />
      <p className="text-sm text-gray-600">
        Prefer email? Reach us at <a href="mailto:wholesale@d8.example" className="underline">wholesale@d8.example</a>.
      </p>
    </div>
  );
}
