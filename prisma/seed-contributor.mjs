// Manually add contributors to the wall (Supabase Contributor table).
//
//   node prisma/seed-contributor.mjs                            # seed contributors.ts list
//   node prisma/seed-contributor.mjs <github-username> [role]   # seed a single user
//
// Keyed by GitHub id (same key as the cron sync), so re-running upserts rather
// than duplicates. Auto-approved. Requires DATABASE_URL in .env.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { MANUAL_CONTRIBUTORS } from "./contributors.ts";

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

// Upsert one contributor by GitHub username. Keyed by GitHub id so re-running
// updates rather than duplicates.
async function seedContributor(prisma, { username, role }) {
  const user = await fetchGitHubUser(username);
  console.log(`Seeding contributor "${username}" (githubId=${user.githubId})…`);

  // `role` is only included when provided, so re-running without it won't
  // wipe an existing role.
  const base = {
    name: user.name,
    avatarUrl: user.avatarUrl,
    profileUrl: user.profileUrl,
    ...(role != null ? { role } : {}),
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
}

async function main() {
  const [, , usernameArg, roleArg] = process.argv;

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — check your .env file.");
  }

  // A username arg seeds just that user; otherwise seed the manual list.
  const targets = usernameArg
    ? [{ username: usernameArg, role: roleArg ?? null }]
    : MANUAL_CONTRIBUTORS;

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const target of targets) {
      await seedContributor(prisma, target);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("✗ Seed failed:", error.message);
  process.exit(1);
});
