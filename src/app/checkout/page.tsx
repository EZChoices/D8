// === File: src/app/checkout/page.tsx ===
export default function CheckoutPage() {
return (
<div className="space-y-6">
<h1 className="text-3xl font-bold">Checkout</h1>


<form className="space-y-4">
<input type="text" placeholder="Full Name" className="border p-2 w-full" required />
<input type="email" placeholder="Email Address" className="border p-2 w-full" required />
<input type="text" placeholder="Shipping Address" className="border p-2 w-full" required />
<input type="text" placeholder="Phone Number" className="border p-2 w-full" required />


<div className="border p-4 bg-gray-100">
<h2 className="text-lg font-semibold mb-2">Payment Instructions</h2>
<p className="text-sm mb-2">
Please send <strong>USDT / ETH</strong> to the following wallet address:
</p>
<code className="block p-2 bg-white border text-sm">
0xYourWalletAddressGoesHere1234567890abcdef
</code>
<p className="text-sm text-gray-500 mt-2">
Your order will be confirmed via email once payment is received.
</p>
</div>


<button type="submit" className="bg-black text-white px-4 py-2">
Place Order
</button>
</form>
</div>
);
}