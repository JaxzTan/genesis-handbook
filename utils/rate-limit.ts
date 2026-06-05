import "server-only";

// Best-effort in-memory sliding-window limiter. State lives per server instance,
// so for multi-instance / serverless production swap this for @upstash/ratelimit
// (Redis-backed), exactly like the skilldrops setup.
const store = new Map<string, number[]>();

const DEFAULT_MAX = 5; // submissions
const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

export function checkRateLimit(
  key: string,
  max: number = DEFAULT_MAX,
  windowMs: number = DEFAULT_WINDOW_MS
): boolean {
  const now = Date.now();
  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    store.set(key, recent);
    return false;
  }

  recent.push(now);
  store.set(key, recent);
  return true;
}
