"use client";
import React from "react";
import { CartProvider } from "@/components/CartContext";
import { ShippingProvider } from "@/components/ShippingContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ShippingProvider>{children}</ShippingProvider>
    </CartProvider>
  );
}
