import { createHmac, timingSafeEqual } from "node:crypto";

// Pure session-token crypto. Deliberately free of `server-only` and
// `next/headers` so that `proxy.ts` can import it for optimistic checks —
// proxy runs outside the render path and must not pull in request-scoped APIs.

export const ADMIN_COOKIE = "genesis_admin";

/** Sessions last 12h — long enough for a working session, short enough to expire overnight. */
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

/** Token shape: `<expiresAtMs>.<base64url hmac>` */
const TOKEN_PATTERN = /^(\d+)\.([A-Za-z0-9_-]+)$/;

function readSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set — the admin dashboard cannot sign sessions."
    );
  }
  return secret;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Constant-time string compare that never throws on length mismatch. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Create a signed token that expires `SESSION_TTL_MS` from `now`. */
export function createToken(now: number = Date.now()): string {
  const expiresAt = now + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, readSecret())}`;
}

/**
 * Verify a token's signature and expiry.
 * Returns false for anything malformed, tampered, or expired — never throws
 * on bad input, so callers can treat it as a plain boolean gate.
 */
export function verifyToken(
  token: string | undefined,
  now: number = Date.now()
): boolean {
  if (!token) return false;

  const match = TOKEN_PATTERN.exec(token);
  if (!match) return false;

  const [, payload, signature] = match;

  let expected: string;
  try {
    expected = sign(payload, readSecret());
  } catch {
    // Missing secret — fail closed rather than leaking an error to the edge.
    return false;
  }

  if (!safeEqual(signature, expected)) return false;

  return Number(payload) > now;
}
