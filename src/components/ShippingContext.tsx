"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ShippingState = {
  state: string | null;
  setState: (s: string | null) => void;
};

const Ctx = createContext<ShippingState | null>(null);

export function ShippingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<string | null>(null);
  useEffect(() => {
    try {
      const s = localStorage.getItem("ship_state");
      if (s) setState(s);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      if (state) localStorage.setItem("ship_state", state);
      else localStorage.removeItem("ship_state");
    } catch {}
  }, [state]);
  return <Ctx.Provider value={{ state, setState }}>{children}</Ctx.Provider>;
}

export function useShipping() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShipping must be used in ShippingProvider");
  return v;
}

