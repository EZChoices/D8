import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "D8 — Premium Delta-8. Nothing Else.", template: "%s · D8" },
  description: "Clean, honest, third-party lab-tested Delta-8.",
  metadataBase: new URL("https://d8-orpin.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "D8 — Premium Delta-8. Nothing Else.",
    description: "Clean, honest, third-party lab-tested Delta-8.",
    type: "website",
    url: "https://d8-orpin.vercel.app",
    siteName: "D8"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "D8",
    url: "https://d8-orpin.vercel.app",
    logo: "https://d8-orpin.vercel.app/icon.png",
    sameAs: [] as string[]
  };
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://d8-orpin.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://d8-orpin.vercel.app/search?q={query}",
      "query-input": "required name=query"
    }
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <a className="skip" href="#content">Skip to content</a>
        <Header />
        <main id="content" className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <Footer />
        <JsonLd json={org} />
        <JsonLd json={site} />
        {/* Consent Mode defaults and GA4 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('consent','default',{
  'ad_user_data':'denied','ad_personalization':'denied','ad_storage':'denied','analytics_storage':'denied'
});
            `.trim()
          }}
        />
        <script async src={"https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"} />
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('js', new Date()); gtag('config', 'G-XXXXXXX', { anonymize_ip: true });`
          }}
        />
        <ConsentBanner />
      </body>
    </html>
  );
}
