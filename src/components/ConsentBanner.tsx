"use client";
import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("consent-set")) return;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[2000] bg-black p-4 text-white"
    >
      <p className="m-0 text-sm">
        We use cookies for analytics. You can accept or reject.
      </p>
      <div className="mt-2 flex gap-2">
        <button
          className="rounded bg-white px-3 py-1 text-black"
          onClick={() => {
            (window as any).gtag?.("consent", "update", {
              analytics_storage: "granted"
            });
            localStorage.setItem("consent-set", "1");
            setShow(false);
          }}
        >
          Accept
        </button>
        <button
          className="rounded border border-white px-3 py-1"
          onClick={() => {
            (window as any).gtag?.("consent", "update", {
              analytics_storage: "denied"
            });
            localStorage.setItem("consent-set", "1");
            setShow(false);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

