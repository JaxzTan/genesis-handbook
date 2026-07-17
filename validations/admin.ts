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

  // Rows rendered at once. An allow-list rather than a free number, so nobody
  // can ask for ?limit=1000000 and stall the page.
  limit: z.enum(["25", "50", "100", "200"]).catch("50").default("50"),

  q: z.string().trim().max(200).catch("").default(""),
});

export const LIMIT_OPTIONS = ["25", "50", "100", "200"] as const;

export type AdminLoginInput = z.input<typeof adminLoginSchema>;
export type FeedbackFilter = z.output<typeof feedbackFilterSchema>;
