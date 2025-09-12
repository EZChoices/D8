"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, setQty, remove, clear, total_cents } = useCart();
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
                  <td style={{ padding: 8 }}>{i.title}</td>
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
              <div className="text-lg font-semibold">Total: ${(total_cents / 100).toFixed(2)}</div>
              <Link href="/checkout" className="mt-2 inline-block rounded bg-black px-4 py-2 text-white">
                Begin checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

