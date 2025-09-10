// === File: src/app/contact/page.tsx ===
export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Your message..."
          className="border p-2 w-full"
          rows={5}
        ></textarea>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}
