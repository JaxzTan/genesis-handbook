import "server-only";
import { prisma } from "@/utils/prisma";
import { fetchGitHubContributors } from "@/actions/github-contributors";

// Pull the current GitHub contributors and upsert them into the DB, keyed by
// GitHub id so the job is idempotent. GitHub contributors are auto-approved
// (they're real committers); manually-added handbook contributors keep the
// approval gate. Returns the number of rows synced.
export async function syncContributorsFromGitHub(): Promise<number> {
  const contributors = await fetchGitHubContributors();

  if (contributors.length === 0) {
    // Don't wipe the wall if GitHub is momentarily unreachable — just no-op.
    console.warn("[sync] GitHub returned no contributors; skipping upsert");
    return 0;
  }

  let synced = 0;
  for (const c of contributors) {
    await prisma.contributor.upsert({
      where: { githubId: c.id },
      create: {
        githubId: c.id,
        name: c.name,
        avatarUrl: c.avatarUrl,
        profileUrl: c.profileUrl,
        contributions: c.contributions ?? 0,
        approved: true,
      },
      update: {
        name: c.name,
        avatarUrl: c.avatarUrl,
        profileUrl: c.profileUrl,
        contributions: c.contributions ?? 0,
      },
    });
    synced++;
  }

  return synced;
}
