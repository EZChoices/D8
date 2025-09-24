"use client";
import React from "react";
import { CartProvider } from "@/components/CartContext";
import { ShippingProvider } from "@/components/ShippingContext";
import { WholesaleProvider } from "@/components/WholesaleContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WholesaleProvider>
      <CartProvider>
        <ShippingProvider>{children}</ShippingProvider>
      </CartProvider>
    </WholesaleProvider>
  );
}
