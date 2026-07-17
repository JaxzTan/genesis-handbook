import type { FeedbackStats } from "@/utils/feedback-stats";

type Tile = {
  label: string;
  value: string;
  hint: string;
};

function buildTiles(stats: FeedbackStats): readonly Tile[] {
  return [
    {
      label: "Total feedback",
      value: String(stats.total),
      hint: stats.total === 1 ? "submission" : "submissions, all time",
    },
    {
      label: "Average rating",
      value:
        stats.averageRating === null ? "—" : stats.averageRating.toFixed(1),
      hint:
        stats.averageRating === null
          ? "nobody has rated yet"
          : `from ${stats.ratedCount} rated`,
    },
    {
      label: "Last 7 days",
      value: String(stats.lastSevenDays),
      hint: "new since last week",
    },
    {
      label: "Reachable",
      value: `${stats.withEmailPercent}%`,
      hint: `${stats.withEmail} left an email`,
    },
  ];
}

export function StatTiles({ stats }: { stats: FeedbackStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t-[1.5px] border-g-ink">
      {buildTiles(stats).map((tile, i) => (
        <div
          key={tile.label}
          className={`py-7 px-5 border-b border-g-rule ${
            i > 0 ? "md:border-l md:border-g-rule" : ""
          } ${i % 2 === 1 ? "border-l border-g-rule md:border-l" : ""}`}
        >
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid mb-3">
            {tile.label}
          </div>
          <div className="font-serif text-4xl font-bold tracking-[-0.03em] text-g-ink leading-none">
            {tile.value}
          </div>
          <div className="text-[11px] text-g-muted mt-2.5">{tile.hint}</div>
        </div>
      ))}
    </div>
  );
}
