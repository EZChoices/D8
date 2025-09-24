"use client";
import { useShipping } from "@/components/ShippingContext";
import { useWholesale } from "@/components/WholesaleContext";
import { evaluatePurchaseGate } from "@/lib/purchasePolicy";
import PdpStickyAddToCart from "@/components/PdpStickyAddToCart";

export default function PdpAvailability({
  product
}: {
  product: {
    slug: string;
    title: string;
    price_cents: number;
    images?: string[];
    tags?: string[];
    channels?: string[];
    category?: string;
  };
}) {
  const { state } = useShipping();
  const { status } = useWholesale();
  const gate = evaluatePurchaseGate(product as any, { state, wholesaleStatus: status });
  return (
    <>
      {gate.messages.length > 0 && (
        <div className="space-y-2 text-sm">
          {gate.messages.map((message) => (
            <p key={message} className="text-amber-700">
              {message}
            </p>
          ))}
          <p className="text-xs text-gray-600">
            See <a href="/where-we-ship" className="underline">Where we ship</a> for the full matrix.
          </p>
        </div>
      )}
      {gate.canPurchase ? (
        <div className="mt-8">
          <PdpStickyAddToCart product={product} />
        </div>
      ) : gate.requiresWholesale ? (
        <p className="mt-6 text-sm">
          <a href="/wholesale#access" className="rounded border border-dashed px-4 py-2 text-xs uppercase tracking-wide">
            Request wholesale access
          </a>
        </p>
      ) : null}
    </>
  );
}

