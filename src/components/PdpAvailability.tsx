"use client";
import { useShipping } from "@/components/ShippingContext";
import { RESTRICTED_STATES } from "@/lib/restrictions";
import PdpStickyAddToCart from "@/components/PdpStickyAddToCart";

export default function PdpAvailability({
  product
}: {
  product: { slug: string; title: string; price_cents: number; images?: string[] };
}) {
  const { state } = useShipping();
  const restricted = state ? RESTRICTED_STATES.includes(state) : false;
  return (
    <>
      {restricted && (
        <p className="text-sm text-red-700">
          This item is not available to ship to {state}. <a href="/where-we-ship" className="underline">Check restrictions</a>.
        </p>
      )}
      {!restricted && (
        <div className="mt-8">
          <PdpStickyAddToCart product={product} />
        </div>
      )}
    </>
  );
}

