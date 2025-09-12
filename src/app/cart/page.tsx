"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { beginCheckout } from "@/lib/ga";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
  const discountRate = count >= 3 ? 0.15 : count >= 2 ? 0.1 : 0;
  const discount_cents = Math.round(subtotal * discountRate);
  const total_after = subtotal - discount_cents;

  return (
    <section className="section">
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/shop">Browse products</Link>.
        </p>
      ) : (
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>Item</th>
                <th style={{ textAlign: "left", padding: 8 }}>Qty</th>
                <th style={{ textAlign: "left", padding: 8 }}>Price</th>
                <th style={{ textAlign: "left", padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.slug} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {i.image && (
                        <span style={{ position: "relative", width: 48, height: 48, display: "inline-block" }}>
                          <ResponsiveImage src={i.image} alt={i.title} fill sizes="48px" className="object-contain" />
                        </span>
                      )}
                      <span>{i.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: 8 }}>
                    <input
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) => setQty(i.slug, Number(e.target.value))}
                      style={{ width: 64 }}
                    />
                  </td>
                  <td style={{ padding: 8 }}>${(i.price_cents / 100).toFixed(2)}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => remove(i.slug)} className="underline">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between">
            <button onClick={clear} className="text-sm underline">
              Clear cart
            </button>
            <div className="text-right">
              {discountRate > 0 && (
                <div className="text-sm text-green-700">
                  Bundle discount applied: {Math.round(discountRate * 100)}% (−${(discount_cents / 100).toFixed(2)})
                </div>
              )}
              <div className="text-sm text-gray-600">
                {total_after < 7500
                  ? `You’re $${((7500 - total_after) / 100).toFixed(2)} away from free US shipping.`
                  : "Free US shipping unlocked!"}
              </div>
              <div className="text-lg font-semibold">Total: ${(total_after / 100).toFixed(2)}</div>
              <Link
                href="/checkout"
                onClick={() =>
                  beginCheckout(
                    items.map((i) => ({ id: i.slug, name: i.title, price: i.price_cents / 100, quantity: i.quantity }))
                  )
                }
                className="mt-2 inline-block rounded bg-black px-4 py-2 text-white"
              >
                Begin checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
