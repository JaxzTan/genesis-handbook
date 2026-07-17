import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/constants/admin";
import {
  ADMIN_COOKIE,
  SESSION_TTL_MS,
  createToken,
  safeEqual,
  verifyToken,
} from "@/utils/admin-session";

// Request-scoped session helpers. This is the real authorization gate: the
// proxy check is only optimistic (it runs on prefetches and cannot be trusted
// as the sole guard), so every admin page and action calls into here.

/**
 * Verify submitted credentials against ADMIN_USERNAME / ADMIN_PASSWORD.
 *
 * Both comparisons always run — short-circuiting on a bad username would leak,
 * via response timing, whether the username was the right one.
 */
export function isValidCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    console.error(
      "[admin] ADMIN_USERNAME / ADMIN_PASSWORD are not both set — refusing all logins."
    );
    return false;
  }

  const userOk = safeEqual(username, expectedUser);
  const passwordOk = safeEqual(password, expectedPassword);
  return userOk && passwordOk;
}

/** Issue a signed session cookie. */
export async function startSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/** Clear the session cookie. */
export async function endSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

/** True when the current request carries a valid, unexpired session. */
export async function hasValidSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

/**
 * Hard gate for admin pages and actions. Redirects to the login page when the
 * session is missing, tampered with, or expired.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await hasValidSession())) {
    redirect(LOGIN_PATH);
  }
}
