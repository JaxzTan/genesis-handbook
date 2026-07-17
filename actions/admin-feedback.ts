"use server";

import { revalidatePath } from "next/cache";
import { ADMIN_PATH } from "@/constants/admin";
import { prisma } from "@/utils/prisma";
import { requireAdmin } from "@/utils/admin-auth";
import { buildFeedbackOrderBy, buildFeedbackWhere } from "@/utils/feedback-query";
import { computeFeedbackStats } from "@/utils/feedback-stats";
import type { FeedbackRecord, FeedbackStats } from "@/utils/feedback-stats";
import type { FeedbackFilter } from "@/validations/admin";
import { deleteFeedbackSchema } from "@/validations/admin";

export type DeleteResult = { ok: true } | { ok: false; error: string };

export type DashboardData = {
  stats: FeedbackStats;
  /** Just this page's rows. */
  items: readonly FeedbackRecord[];
  /** Total rows matching the filter, across every page. */
  matched: number;
  /** The page actually served — may differ from the one asked for (see below). */
  page: number;
  pageCount: number;
  pageSize: number;
  /** 1-based index of the first row on this page; 0 when there are none. */
  firstRow: number;
  lastRow: number;
};

/**
 * Everything the dashboard renders, in one call.
 *
 * Stats are computed over *all* feedback, not the filtered subset — the summary
 * row is meant to describe the whole corpus, so it stays stable while you filter
 * the list underneath it.
 */
export async function getDashboardData(
  filter: FeedbackFilter
): Promise<DashboardData> {
  await requireAdmin();

  const where = buildFeedbackWhere(filter);
  // Safe: the schema restricts limit to an allow-list of values.
  const pageSize = Number(filter.limit);

  const [all, matched] = await Promise.all([
    prisma.feedback.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.feedback.count({ where }),
  ]);

  // Clamp before querying. Asking for page 9 of 3 — by hand, or by deleting the
  // last row on the last page — should show the final page, not an empty one.
  const pageCount = Math.max(1, Math.ceil(matched / pageSize));
  const page = Math.min(Math.max(filter.page, 1), pageCount);

  const items = await prisma.feedback.findMany({
    where,
    orderBy: buildFeedbackOrderBy(filter),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    stats: computeFeedbackStats(all),
    items,
    matched,
    page,
    pageCount,
    pageSize,
    firstRow: matched === 0 ? 0 : (page - 1) * pageSize + 1,
    lastRow: (page - 1) * pageSize + items.length,
  };
}

export async function deleteFeedback(raw: unknown): Promise<DeleteResult> {
  // Gate first: never touch the DB on behalf of an unauthenticated caller.
  // Server actions are public HTTP endpoints — the proxy check does not cover them.
  await requireAdmin();

  const parsed = deleteFeedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Could not delete that entry.",
    };
  }

  try {
    await prisma.feedback.delete({ where: { id: parsed.data.id } });
  } catch (error) {
    console.error("[admin] failed to delete feedback:", error);
    return { ok: false, error: "Could not delete that entry. Please retry." };
  }

  revalidatePath(ADMIN_PATH);
  return { ok: true };
}
