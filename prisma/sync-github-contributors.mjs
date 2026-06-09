// Manually run the GitHub → DB contributor sync (the same job the hourly Vercel
// cron does, see actions/sync-contributors.ts). Populates the Supabase
// Contributor table so the wall reads the full set from the DB instead of the
// live GitHub fallback.
//
//   node prisma/sync-github-contributors.mjs
//
// Idempotent (upsert by GitHub id); leaves manually-seeded contributors alone.
// Requires DATABASE_URL in .env; owner/repo default as in constants/site.ts.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || "JaxzTan";
const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || "genesis-handbook-demo";

// Fetch the repo's contributors (fetch follows GitHub's 301 for a renamed
// repo). Returns a normalized list.
async function fetchGitHubContributors() {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=100`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "genesis-handbook",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Contributors fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data
    .filter((c) => c.type !== "Bot" && !c.login.endsWith("[bot]"))
    .map((c) =>
      Object.freeze({
        githubId: String(c.id),
        name: c.login,
        avatarUrl: c.avatar_url ?? null,
        profileUrl: c.html_url ?? null,
        contributions: c.contributions ?? 0,
      })
    );
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — check your .env file.");
  }

  console.log(`Syncing contributors from ${OWNER}/${REPO}…`);
  const contributors = await fetchGitHubContributors();

  if (contributors.length === 0) {
    console.warn("GitHub returned no contributors; nothing to sync.");
    return;
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const c of contributors) {
      await prisma.contributor.upsert({
        where: { githubId: c.githubId },
        create: {
          githubId: c.githubId,
          name: c.name,
          avatarUrl: c.avatarUrl,
          profileUrl: c.profileUrl,
          contributions: c.contributions,
          approved: true,
        },
        update: {
          name: c.name,
          avatarUrl: c.avatarUrl,
          profileUrl: c.profileUrl,
          contributions: c.contributions,
        },
      });
      console.log(`  ✓ ${c.name} (githubId=${c.githubId}, contributions=${c.contributions})`);
    }

    const total = await prisma.contributor.count({ where: { approved: true } });
    console.log(`✓ Synced ${contributors.length} from GitHub. Approved total on wall: ${total}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("✗ Sync failed:", error.message);
  process.exit(1);
});
