import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "D8 — Pure Delta-8",
  description: "Clean Delta-8 products. Nothing else.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "D8 — Pure Delta-8",
    description: "Clean Delta-8 products. Nothing else.",
    type: "website",
    url: "https://d8-orpin.vercel.app",
    images: [{ url: "/refillable-cart.png", alt: "Refillable Delta-8 vape cartridge" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
