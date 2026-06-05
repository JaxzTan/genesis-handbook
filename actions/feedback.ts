"use server";

import { headers } from "next/headers";
import { prisma } from "@/utils/prisma";
import { checkRateLimit } from "@/utils/rate-limit";
import { feedbackSchema } from "@/validations/feedback";

export type FeedbackResult = { ok: true } | { ok: false; error: string };

// Honeypot field name — real users never see or fill it; bots do.
const HONEYPOT_FIELD = "website";

async function getClientIp(): Promise<string> {
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function submitFeedback(raw: unknown): Promise<FeedbackResult> {
  // 1) Honeypot — silently accept so bots don't learn they were caught.
  if (
    raw &&
    typeof raw === "object" &&
    HONEYPOT_FIELD in raw &&
    (raw as Record<string, unknown>)[HONEYPOT_FIELD]
  ) {
    return { ok: true };
  }

  // 2) Validate + sanitize.
  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, error: first ?? "Please check your input and try again." };
  }

  // 3) Rate limit per IP.
  const ip = await getClientIp();
  if (!checkRateLimit(`feedback:${ip}`)) {
    return {
      ok: false,
      error: "Too many submissions — please try again in a few minutes.",
    };
  }

  // 4) Persist.
  const { name, email, rating, message } = parsed.data;
  try {
    await prisma.feedback.create({
      data: {
        name: name ?? null,
        email: email ?? null,
        rating: rating ?? null,
        message,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("[feedback] failed to store:", error);
    return {
      ok: false,
      error: "Something went wrong saving your feedback. Please try again.",
    };
  }
}
