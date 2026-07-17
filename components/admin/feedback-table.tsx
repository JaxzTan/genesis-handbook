import { DeleteFeedbackButton } from "@/components/admin/delete-feedback-button";
import { RATING_VALUES, formatFeedbackDate } from "@/utils/feedback-stats";
import type { FeedbackRecord } from "@/utils/feedback-stats";

// `width` shapes the columns: the message is the point of this table, so it
// takes all leftover space while the metadata columns stay tight.
const COLUMNS = [
  { label: "Rating", className: "w-[112px]" },
  { label: "From", className: "w-[180px]" },
  { label: "Feedback", className: "w-auto" },
  { label: "Received", className: "w-[150px]" },
  { label: "", className: "w-[104px]" },
] as const;

export function FeedbackTable({
  items,
  filtered,
}: {
  items: readonly FeedbackRecord[];
  filtered: boolean;
}) {
  if (items.length === 0) {
    return (
      <div className="border border-g-rule bg-white px-8 py-16 text-center">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-g-mid mb-3">
          Nothing here
        </div>
        <p className="text-sm text-g-mid max-w-[40ch] mx-auto">
          {filtered
            ? "No feedback matches these filters. Try widening them."
            : "No feedback has come in yet. Share the form and check back."}
        </p>
      </div>
    );
  }

  return (
    // The table has a floor width so columns never crush; on narrow screens the
    // wrapper scrolls instead of the page.
    <div className="border border-g-rule bg-white overflow-x-auto">
      {/* table-fixed makes the column widths above authoritative, so one long
          message can't shove the metadata columns around. */}
      <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b-[1.5px] border-g-ink">
            {COLUMNS.map((col, i) => (
              <th
                key={col.label || `actions-${i}`}
                scope="col"
                // `relative` matters: the sr-only label below is absolutely
                // positioned, and without a positioned ancestor it resolves
                // against the page — escaping this table's scroll container and
                // widening the whole document on narrow screens.
                className={`relative font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid font-normal px-5 py-4 whitespace-nowrap ${col.className}`}
              >
                {col.label || <span className="sr-only">Actions</span>}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-g-rule last:border-b-0 align-top hover:bg-g-off/60 transition-colors"
            >
              <td className="px-5 py-5 whitespace-nowrap">
                <RatingCell rating={item.rating} />
              </td>

              <td className="px-5 py-5">
                <div className="text-[13px] font-semibold text-g-ink whitespace-nowrap">
                  {item.name ?? "Anonymous"}
                </div>
                {item.email ? (
                  <a
                    href={`mailto:${item.email}`}
                    className="text-[11px] text-g-accent no-underline hover:underline break-all"
                  >
                    {item.email}
                  </a>
                ) : (
                  <div className="text-[11px] text-g-muted">No contact</div>
                )}
              </td>

              <td className="px-5 py-5">
                {/* Feedback runs long — wrap it fully rather than truncating,
                    and break unspaced walls of text instead of letting them
                    stretch the column. */}
                <p className="text-sm text-g-ink leading-relaxed whitespace-pre-wrap break-words m-0">
                  {item.message}
                </p>
              </td>

              <td className="px-5 py-5">
                <time
                  dateTime={item.createdAt.toISOString()}
                  className="font-mono text-[10px] text-g-muted whitespace-nowrap"
                >
                  {formatFeedbackDate(item.createdAt)}
                </time>
              </td>

              <td className="px-5 py-5 text-right">
                <div className="flex justify-end">
                  <DeleteFeedbackButton id={item.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatingCell({ rating }: { rating: number | null }) {
  if (rating === null) {
    return (
      <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-g-muted border border-dashed border-g-rule rounded px-2 py-1">
        Unrated
      </span>
    );
  }

  return (
    <span
      className="flex items-center gap-2"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      <span className="flex gap-1" aria-hidden>
        {RATING_VALUES.map((n) => (
          <span
            key={n}
            className={`w-2 h-2 rounded-full ${
              n <= rating ? "bg-g-accent" : "bg-g-rule"
            }`}
          />
        ))}
      </span>
      <span className="font-serif text-sm font-bold text-g-ink" aria-hidden>
        {rating}
      </span>
    </span>
  );
}
