// === File: src/app/layout.tsx ===
import "@/styles/globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link href="/">Delta8 Brand</Link>
          </h1>
          <nav className="space-x-4">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main className="p-6 max-w-4xl mx-auto">{children}</main>

        <footer className="p-4 border-t text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Delta8. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
