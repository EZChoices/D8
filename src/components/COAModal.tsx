"use client";

import { useState } from "react";

export default function COAModal({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="underline">
        View COA
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-4 max-w-xl w-full">
            <button className="mb-2 text-sm" onClick={() => setOpen(false)}>
              Close
            </button>
            <iframe src={url} className="w-full h-96" />
          </div>
        </div>
      )}
    </>
  );
}

