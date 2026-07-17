// Pure summary math for the admin dashboard. No Prisma, no request context —
// just data in, data out, so this stays cheap to reason about and to test.

export type FeedbackRecord = {
  id: string;
  name: string | null;
  email: string | null;
  rating: number | null;
  message: string;
  createdAt: Date;
};

export const RATING_VALUES = [1, 2, 3, 4, 5] as const;

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type RatingBucket = {
  rating: number;
  count: number;
  /** Share of *rated* submissions, 0–100. Unrated ones are excluded. */
  percent: number;
};

export type FeedbackStats = {
  total: number;
  ratedCount: number;
  /** Mean of the ratings that exist, or null when nobody has rated yet. */
  averageRating: number | null;
  lastSevenDays: number;
  withEmail: number;
  /** Share of all submissions that left an email, 0–100. */
  withEmailPercent: number;
  distribution: readonly RatingBucket[];
};

function percentOf(count: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
}

/**
 * Summarize a set of feedback records.
 *
 * `now` is injectable so the "last 7 days" window is deterministic in tests
 * rather than depending on the wall clock.
 */
export function computeFeedbackStats(
  records: readonly FeedbackRecord[],
  now: number = Date.now()
): FeedbackStats {
  const ratings = records
    .map((r) => r.rating)
    .filter((r): r is number => r !== null);

  const ratedCount = ratings.length;
  const averageRating =
    ratedCount === 0
      ? null
      : ratings.reduce((sum, r) => sum + r, 0) / ratedCount;

  const lastSevenDays = records.filter(
    (r) => now - r.createdAt.getTime() < WEEK_MS
  ).length;

  const withEmail = records.filter((r) => r.email !== null).length;

  const distribution = RATING_VALUES.map((rating) => {
    const count = ratings.filter((r) => r === rating).length;
    return { rating, count, percent: percentOf(count, ratedCount) };
  });

  return {
    total: records.length,
    ratedCount,
    averageRating,
    lastSevenDays,
    withEmail,
    withEmailPercent: percentOf(withEmail, records.length),
    distribution,
  };
}

/** Short, stable date label for a feedback row. */
export function formatFeedbackDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
