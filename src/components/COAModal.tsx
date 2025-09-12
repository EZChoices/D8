"use client";

import { useEffect, useState } from "react";

export default function COAModal({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="underline">
        View COA
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate of Analysis"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="max-w-3xl w-full bg-white p-4">
            <button className="mb-2 text-sm" onClick={() => setOpen(false)} aria-label="Close">
              Close
            </button>
            <iframe title="COA" src={url} className="h-[70vh] w-full" />
          </div>
        </div>
      )}
    </>
  );
}

