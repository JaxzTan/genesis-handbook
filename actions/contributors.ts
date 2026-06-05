import "server-only";
import { prisma } from "@/utils/prisma";
import {
  buildStats,
  getLiveContributorStats,
} from "@/actions/github-contributors";
import type { Contributor, HandbookStats } from "@/types";

// Read approved contributors from the DB (populated by the scheduled GitHub
// sync). Falls back to a live GitHub fetch when the DB is empty or unreachable
// so the wall renders even before the first sync / without a database.
export async function getContributorStats(): Promise<{
  stats: HandbookStats;
  contributors: Contributor[];
}> {
  try {
    const rows = await prisma.contributor.findMany({
      where: { approved: true },
      orderBy: [{ contributions: "desc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        profileUrl: true,
        contributions: true,
      },
    });

    if (rows.length > 0) {
      return { stats: buildStats(rows), contributors: rows };
    }

    // DB reachable but empty (no sync yet) → show live GitHub data.
    return getLiveContributorStats();
  } catch (error) {
    // DB unreachable (e.g. no DATABASE_URL configured) → live GitHub fallback.
    console.warn("[contributors] DB read failed, using live GitHub:", error);
    return getLiveContributorStats();
  }
}
