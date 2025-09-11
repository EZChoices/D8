import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">We couldn’t find what you were looking for.</p>
      <Link href="/" className="rounded bg-black px-4 py-2 text-white">Go home</Link>
    </div>
  );
}
