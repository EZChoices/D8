"use client";
import { useWholesale } from "@/components/WholesaleContext";
import { useShipping } from "@/components/ShippingContext";
import { evaluatePurchaseGate, productRequiresWholesale } from "@/lib/purchasePolicy";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

export default function ProductPriceGate({ product }: { product: Product }) {
  const { status } = useWholesale();
  const { state } = useShipping();
  const gate = evaluatePurchaseGate(product, { state, wholesaleStatus: status });
  const requiresWholesale = productRequiresWholesale(product);
  if (gate.canPurchase) {
    return (
      <div className="mt-4 space-y-1">
        <p className="text-2xl font-bold">{formatPrice(product.price_cents)}</p>
        {product.case_pack ? <p className="text-sm text-gray-600">Case pack: {product.case_pack}</p> : null}
        {product.moq_units ? <p className="text-sm text-gray-600">MOQ: {product.moq_units} units</p> : null}
      </div>
    );
  }
  if (requiresWholesale) {
    return (
      <div className="mt-4 space-y-2 text-sm">
        <p className="font-semibold text-gray-700">Wholesale verification required to view pricing.</p>
        <a href="/wholesale#access" className="inline-block rounded border border-dashed px-4 py-2 text-xs uppercase tracking-wide">
          Request wholesale access
        </a>
      </div>
    );
  }
  return (
    <div className="mt-4 text-sm text-amber-700">
      {gate.messages[0] || "Not available in your selected state."}
    </div>
  );
}
