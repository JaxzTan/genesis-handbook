import { z } from "zod";

export const ADMIN_LIMITS = {
  usernameMax: 100,
  passwordMax: 200,
} as const;

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Please enter the admin username.")
    .max(ADMIN_LIMITS.usernameMax, "That username is too long."),

  password: z
    .string()
    .min(1, "Please enter the admin password.")
    .max(ADMIN_LIMITS.passwordMax, "That password is too long."),
});

export const deleteFeedbackSchema = z.object({
  id: z.string().min(1, "Missing feedback id."),
});

/**
 * Dashboard filters, parsed from the URL — so every field must tolerate
 * garbage. `.catch()` falls back to the default instead of throwing on a
 * hand-edited query string.
 */
export const feedbackFilterSchema = z.object({
  // "all" | "1".."5" | "none" (submissions that skipped the rating)
  rating: z
    .enum(["all", "1", "2", "3", "4", "5", "none"])
    .catch("all")
    .default("all"),

  // "all" | "yes" (left an email) | "no" (no way to follow up)
  hasEmail: z.enum(["all", "yes", "no"]).catch("all").default("all"),

  sort: z.enum(["newest", "oldest"]).catch("newest").default("newest"),

  // Page size. An allow-list rather than a free number, so nobody can ask for
  // ?limit=1000000 and stall the page.
  limit: z.enum(["20", "50", "100"]).catch("20").default("20"),

  // 1-based. Junk or out-of-range values fall back to the first page; the
  // server clamps the upper bound once it knows how many rows matched.
  page: z.coerce.number().int().min(1).catch(1).default(1),

  q: z.string().trim().max(200).catch("").default(""),
});

export const LIMIT_OPTIONS = ["20", "50", "100"] as const;

export type AdminLoginInput = z.input<typeof adminLoginSchema>;
export type FeedbackFilter = z.output<typeof feedbackFilterSchema>;
