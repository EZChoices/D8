import { getProduct, formatPrice } from "@/data/products";

export default function CheckoutPage({ searchParams }: { searchParams: { sku?: string; qty?: string } }) {
  const sku = searchParams?.sku;
  const qtyNum = Math.max(1, parseInt(searchParams?.qty || "1", 10) || 1);
  const product = sku ? getProduct(sku) : undefined;
  const subtotal = product ? product.price_cents * qtyNum : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {product ? (
          <div className="text-sm">
            <p><strong>Item:</strong> {product.title}</p>
            <p><strong>Quantity:</strong> {qtyNum}</p>
            <p className="mt-1"><strong>Subtotal:</strong> {formatPrice(subtotal)}</p>
            <p className="text-gray-600">Shipping calculated after address.</p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No item selected. Return to <a className="underline" href="/shop">Shop</a>.</p>
        )}
      </section>

      <form className="space-y-4">
        <h2 className="text-lg font-semibold">Shipping Info</h2>
        <input type="text" placeholder="Full Name" className="border p-2 w-full" required />
        <input type="email" placeholder="Email Address" className="border p-2 w-full" required />
        <input type="text" placeholder="Shipping Address" className="border p-2 w-full" required />
        <input type="text" placeholder="Phone Number" className="border p-2 w-full" required />
      </form>

      <section className="rounded border p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Crypto Payment Instructions</h2>
        <p className="text-sm mb-3">Send payment in <strong>USDT (ERC-20)</strong> or <strong>ETH</strong> to the wallet below. <em>Use the exact network shown. Mismatched networks can result in lost funds.</em></p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-600 mb-1">USDT (ERC-20)</p>
            <code className="block p-2 bg-white border text-xs">0xYourUSDTWalletAddressGoesHere</code>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">ETH</p>
            <code className="block p-2 bg-white border text-xs">0xYourETHWalletAddressGoesHere</code>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Your order will be confirmed via email once payment is received.</p>
      </section>

      <button className="bg-black text-white px-4 py-2">I've sent the payment</button>
    </div>
  );
}
