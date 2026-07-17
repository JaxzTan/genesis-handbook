"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_PATH, LOGIN_PATH } from "@/constants/admin";
import {
  endSession,
  isValidCredentials,
  startSession,
} from "@/utils/admin-auth";
import { checkRateLimit } from "@/utils/rate-limit";
import { adminLoginSchema } from "@/validations/admin";

export type LoginResult = { ok: true } | { ok: false; error: string };

/** Login attempts allowed per IP per window, to blunt password guessing. */
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

async function getClientIp(): Promise<string> {
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function login(raw: unknown): Promise<LoginResult> {
  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Please check your input.",
    };
  }

  // Throttle before checking the password so guesses are rate limited, not just
  // successful logins.
  const ip = await getClientIp();
  if (
    !checkRateLimit(`admin-login:${ip}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS)
  ) {
    return {
      ok: false,
      error: "Too many attempts — please try again in a few minutes.",
    };
  }

  const { username, password } = parsed.data;
  if (!isValidCredentials(username, password)) {
    // Deliberately vague: one message covers both fields, so a wrong username
    // and a wrong password are indistinguishable to someone guessing.
    return { ok: false, error: "Incorrect username or password." };
  }

  await startSession();
  return { ok: true };
}

export async function logout(): Promise<never> {
  await endSession();
  redirect(LOGIN_PATH);
}

export async function goToDashboard(): Promise<never> {
  redirect(ADMIN_PATH);
}
