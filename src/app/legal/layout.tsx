// === File: src/app/legal/layout.tsx ===
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — D8",
  description: "Legal information about D8 products.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

