"use client";
import { useEffect, useState } from "react";

export default function AgeGate() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("age-ok")) return;
    setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Age confirmation"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 1500 }}
    >
      <div
        style={{
          background: "#fff",
          margin: "10vh auto",
          width: "90vw",
          maxWidth: "420px",
          padding: "1.25rem",
          borderRadius: "8px"
        }}
      >
        <h2>21+ Only</h2>
        <p>By entering, you confirm you are 21 or older.</p>
        <button
          onClick={() => {
            localStorage.setItem("age-ok", "1");
            setOpen(false);
          }}
          className="rounded bg-black px-4 py-2 text-white"
        >
          I am 21+
        </button>
      </div>
    </div>
  );
}

