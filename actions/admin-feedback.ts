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
  items: readonly FeedbackRecord[];
  /** Rows matching the filter, before the row limit truncates them. */
  matched: number;
  truncated: boolean;
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

  const [all, items, matched] = await Promise.all([
    prisma.feedback.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.feedback.findMany({
      where,
      orderBy: buildFeedbackOrderBy(filter),
      // Safe: the schema restricts limit to an allow-list of values.
      take: Number(filter.limit),
    }),
    prisma.feedback.count({ where }),
  ]);

  return {
    stats: computeFeedbackStats(all),
    items,
    matched,
    truncated: matched > items.length,
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
