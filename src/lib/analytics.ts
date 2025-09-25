type EventParams = Record<string, any> | undefined;

const isBrowser = () => typeof window !== "undefined";

export function track(event: string, params?: EventParams) {
  if (!isBrowser()) return;

  const g = (window as any).gtag;
  if (typeof g === "function") {
    g("event", event, params || {});
  }

  const p = (window as any).plausible;
  if (typeof p === "function") {
    p(event, { props: params || {} });
  }
}

export function trackError(event: string, error: unknown, params?: EventParams) {
  const details =
    error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) };
  track(event, { ...params, error: details });
}
