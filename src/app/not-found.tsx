import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section text-center">
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="text-ink-400 mt-2">We couldn’t find that page.</p>
      <Link href="/" className="btn btn-primary mt-6">Back Home</Link>
    </div>
  );
}
