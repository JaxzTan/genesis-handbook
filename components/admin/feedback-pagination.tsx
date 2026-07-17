"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PATH } from "@/constants/admin";

/** Page numbers to show: always the first and last, plus a window around the current page. */
function pageWindow(page: number, pageCount: number): readonly (number | "gap")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const shown = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  let previous = 0;
  for (const p of shown) {
    if (previous && p - previous > 1) out.push("gap");
    out.push(p);
    previous = p;
  }
  return out;
}

export function FeedbackPagination({
  page,
  pageCount,
  firstRow,
  lastRow,
  matched,
}: {
  page: number;
  pageCount: number;
  firstRow: number;
  lastRow: number;
  matched: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function goTo(target: number) {
    // Copy rather than mutate — the hook's params object is shared.
    const next = new URLSearchParams(searchParams.toString());
    if (target <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(target));
    }
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `${ADMIN_PATH}?${qs}` : ADMIN_PATH, { scroll: false });
    });
  }

  // One page of results needs no controls, but the count is still worth showing.
  const showControls = pageCount > 1;

  return (
    <div className="border border-g-rule border-t-0 bg-white px-5 py-4 flex flex-wrap items-center justify-between gap-4">
      <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-g-muted m-0">
        {matched === 0 ? "No entries" : `${firstRow}–${lastRow} of ${matched}`}
      </p>

      {showControls && (
        <nav aria-label="Pagination" className="flex items-center gap-1.5">
          <PageButton
            label="← Prev"
            disabled={page <= 1 || pending}
            onClick={() => goTo(page - 1)}
          />

          {pageWindow(page, pageCount).map((entry, i) =>
            entry === "gap" ? (
              <span
                key={`gap-${i}`}
                aria-hidden
                className="font-mono text-[10px] text-g-muted px-1"
              >
                …
              </span>
            ) : (
              <button
                key={entry}
                type="button"
                onClick={() => goTo(entry)}
                disabled={pending}
                aria-current={entry === page ? "page" : undefined}
                aria-label={`Page ${entry}`}
                className={`min-w-[30px] px-2 py-1.5 rounded border font-mono text-[10px] transition-all duration-150 disabled:opacity-50 ${
                  entry === page
                    ? "bg-g-ink text-white border-g-ink"
                    : "bg-g-off text-g-mid border-g-rule hover:border-g-accent hover:text-g-ink"
                }`}
              >
                {entry}
              </button>
            )
          )}

          <PageButton
            label="Next →"
            disabled={page >= pageCount || pending}
            onClick={() => goTo(page + 1)}
          />
        </nav>
      )}
    </div>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-1.5 rounded border border-g-rule bg-g-off font-mono text-[10px] tracking-[0.08em] uppercase text-g-mid hover:border-g-accent hover:text-g-ink transition-all duration-150 disabled:opacity-40 disabled:hover:border-g-rule disabled:hover:text-g-mid"
    >
      {label}
    </button>
  );
}
