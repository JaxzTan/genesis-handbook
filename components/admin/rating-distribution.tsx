import type { FeedbackStats } from "@/utils/feedback-stats";

export function RatingDistribution({ stats }: { stats: FeedbackStats }) {
  if (stats.ratedCount === 0) {
    return (
      <div className="border border-g-rule bg-g-off px-6 py-8 text-center">
        <p className="text-sm text-g-mid">
          No ratings yet. The distribution appears once someone rates.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-g-rule bg-white px-6 py-7">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid mb-6">
        Rating distribution · {stats.ratedCount} rated
      </div>

      <div className="flex flex-col gap-3.5">
        {/* Highest rating first — reads like a review summary. */}
        {[...stats.distribution].reverse().map((bucket) => (
          <div key={bucket.rating} className="flex items-center gap-4">
            <div className="font-serif text-sm font-bold text-g-ink w-3 shrink-0">
              {bucket.rating}
            </div>
            <div
              className="flex-1 h-2 bg-g-off rounded-full overflow-hidden"
              role="img"
              aria-label={`${bucket.count} of ${stats.ratedCount} rated ${bucket.rating} out of 5`}
            >
              <div
                className="h-full bg-g-accent rounded-full transition-[width] duration-500"
                style={{ width: `${bucket.percent}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-g-mid w-16 text-right shrink-0 tabular-nums">
              {bucket.count} · {bucket.percent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
