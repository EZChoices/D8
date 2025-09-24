"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type WholesaleStatus = "guest" | "pending" | "approved";

type WholesaleContextValue = {
  status: WholesaleStatus;
  setStatus: (status: WholesaleStatus) => void;
  requestAccess: () => void;
  markApproved: () => void;
  reset: () => void;
  unlockWithCode: (code: string) => boolean;
};

const STORAGE_KEY = "wholesale-access-status";
const ACCESS_CODE_ENV = process.env.NEXT_PUBLIC_WHOLESALE_ACCESS_CODE;

const WholesaleContext = createContext<WholesaleContextValue | null>(null);

export function WholesaleProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WholesaleStatus>("guest");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "guest" || stored === "pending" || stored === "approved") {
        setStatus(stored);
      }
    } catch (err) {
      console.warn("Unable to read wholesale access from storage", err);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, status);
    } catch (err) {
      console.warn("Unable to persist wholesale access status", err);
    }
  }, [status]);

  const value = useMemo<WholesaleContextValue>(() => {
    return {
      status,
      setStatus,
      requestAccess: () => setStatus((prev) => (prev === "approved" ? prev : "pending")),
      markApproved: () => setStatus("approved"),
      reset: () => setStatus("guest"),
      unlockWithCode: (code: string) => {
        const trimmed = code.trim();
        if (!trimmed) return false;
        if (ACCESS_CODE_ENV && trimmed === ACCESS_CODE_ENV) {
          setStatus("approved");
          return true;
        }
        // Allow teams to set bespoke invite codes in localStorage for demos
        const demoCode = window.localStorage.getItem(`${STORAGE_KEY}-code`);
        if (demoCode && trimmed === demoCode) {
          setStatus("approved");
          return true;
        }
        return false;
      }
    };
  }, [status]);

  return <WholesaleContext.Provider value={value}>{children}</WholesaleContext.Provider>;
}

export function useWholesale() {
  const ctx = useContext(WholesaleContext);
  if (!ctx) throw new Error("useWholesale must be used inside WholesaleProvider");
  return ctx;
}

export type { WholesaleStatus };
