import { z } from "zod";

export const FEEDBACK_LIMITS = {
  nameMax: 80,
  emailMax: 254,
  messageMin: 5,
  messageMax: 2000,
} as const;

// Optional free-text field: trim, cap length, and treat "" as omitted.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((s) => (s ? s : undefined));

export const feedbackSchema = z.object({
  name: optionalText(FEEDBACK_LIMITS.nameMax),

  email: z
    .union([z.literal(""), z.email().max(FEEDBACK_LIMITS.emailMax)])
    .optional()
    .transform((s) => (s ? s : undefined)),

  rating: z.coerce.number().int().min(1).max(5).optional(),

  message: z
    .string()
    .trim()
    .min(FEEDBACK_LIMITS.messageMin, "Please write a little more.")
    .max(FEEDBACK_LIMITS.messageMax, "That message is a bit too long."),
});

export type FeedbackInput = z.input<typeof feedbackSchema>;
export type FeedbackData = z.output<typeof feedbackSchema>;
