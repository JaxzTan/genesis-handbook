// Manually add a single contributor to the wall (Supabase Contributor table).
//
//   node prisma/seed-contributor.mjs <github-username> [role]
//
// Keyed by GitHub id (same key as the cron sync), so re-running upserts rather
// than duplicates. Auto-approved. Requires DATABASE_URL in .env.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const DEFAULT_USERNAME = "jaycigan05";

// Fetch a GitHub user, returning a normalized record. Throws on failure so the
// seed fails fast instead of writing a half-populated row.
async function fetchGitHubUser(username) {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "genesis-handbook",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(
      `GitHub user "${username}" fetch failed: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  return Object.freeze({
    githubId: String(data.id),
    name: data.name || data.login,
    avatarUrl: data.avatar_url ?? null,
    profileUrl: data.html_url ?? null,
  });
}

async function main() {
  const [, , usernameArg, roleArg] = process.argv;
  const username = usernameArg ?? DEFAULT_USERNAME;
  const role = roleArg ?? null;

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — check your .env file.");
  }

  const user = await fetchGitHubUser(username);
  console.log(`Seeding contributor "${username}" (githubId=${user.githubId})…`);

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    // `role` is only included when provided, so re-running without it won't
    // wipe an existing role.
    const base = {
      name: user.name,
      avatarUrl: user.avatarUrl,
      profileUrl: user.profileUrl,
      ...(role !== null ? { role } : {}),
    };

    const contributor = await prisma.contributor.upsert({
      where: { githubId: user.githubId },
      create: { ...base, githubId: user.githubId, approved: true },
      update: base,
    });

    console.log("✓ Done:", {
      id: contributor.id,
      githubId: contributor.githubId,
      name: contributor.name,
      role: contributor.role,
      approved: contributor.approved,
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("✗ Seed failed:", error.message);
  process.exit(1);
});
