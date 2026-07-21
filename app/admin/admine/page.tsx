import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getDashboardData } from "@/actions/admin-feedback";
import { FeedbackFilters } from "@/components/admin/feedback-filters";
import { FeedbackPagination } from "@/components/admin/feedback-pagination";
import { FeedbackTable } from "@/components/admin/feedback-table";
import { LogoutButton } from "@/components/admin/logout-button";
import { RatingDistribution } from "@/components/admin/rating-distribution";
import { RefreshButton } from "@/components/admin/refresh-button";
import { StatTiles } from "@/components/admin/stat-tiles";
import { isFiltered } from "@/utils/feedback-query";
import { feedbackFilterSchema } from "@/validations/admin";

export const metadata: Metadata = {
  title: "Feedback dashboard · Genesis",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Filters come straight off the URL, so they are parsed, never trusted.
  // The schema's .catch() turns hand-edited junk into defaults instead of a 500.
  const filter = feedbackFilterSchema.parse(await searchParams);

  // getDashboardData calls requireAdmin() — the real gate. The proxy redirect is
  // only cosmetic and cannot be relied on here.
  const { stats, items, matched, page, pageCount, firstRow, lastRow } =
    await getDashboardData(filter);

  return (
    <main className="min-h-dvh bg-g-off px-6 py-14 md:px-10">
      <div className="w-full max-w-[1240px] mx-auto">
        <header className="flex items-start justify-between gap-6 mb-10">
          <div>
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-g-mid hover:text-g-ink no-underline transition-colors"
            >
              ← Genesis
            </Link>

            <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-g-accent mt-6 mb-4">
              Admin
            </div>
            <h1
              className="font-serif font-bold text-g-ink leading-[1.0] tracking-[-0.03em] em-mid"
              style={{ fontSize: "clamp(34px, 5vw, 52px)" }}
              dangerouslySetInnerHTML={{ __html: "What they <em>said.</em>" }}
            />
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <RefreshButton />
            <LogoutButton />
          </div>
        </header>

        <section aria-label="Summary" className="mb-10">
          <StatTiles stats={stats} />
        </section>

        <section aria-label="Ratings" className="mb-12">
          <RatingDistribution stats={stats} />
        </section>

        <section aria-label="Feedback">
          <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
            <h2 className="font-serif text-xl font-bold text-g-ink m-0">
              {matched} {matched === 1 ? "entry" : "entries"}
            </h2>
            {pageCount > 1 && (
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-g-muted m-0">
                Page {page} of {pageCount}
              </p>
            )}
          </div>

          <Suspense
            fallback={
              <div className="border border-g-rule border-b-0 bg-white px-5 py-5 text-sm text-g-mid">
                Loading filters…
              </div>
            }
          >
            <FeedbackFilters filter={filter} />
          </Suspense>

          <FeedbackTable items={items} filtered={isFiltered(filter)} />

          <Suspense fallback={null}>
            <FeedbackPagination
              page={page}
              pageCount={pageCount}
              firstRow={firstRow}
              lastRow={lastRow}
              matched={matched}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
