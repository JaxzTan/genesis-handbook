// Seed sample feedback for the admin dashboard (Supabase Feedback table).
//
//   node prisma/seed-feedback.mjs           # add the sample entries
//   node prisma/seed-feedback.mjs --clear   # remove them again (by id prefix)
//
// Rows are given stable `seed-fb-*` ids, so re-running upserts rather than
// duplicates, and --clear only ever removes seeded rows — never real feedback.
// Requires DATABASE_URL in .env.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ID_PREFIX = "seed-fb-";

// `hoursAgo` spreads the rows out so the dashboard's "last 7 days" tile and the
// newest/oldest sort have something meaningful to show.
const SAMPLE_FEEDBACK = Object.freeze([
  {
    id: `${ID_PREFIX}1`,
    name: "Priya Raman",
    email: "priya@example.com",
    rating: 5,
    hoursAgo: 3,
    message:
      "The chapter on judging criteria finally made the rubric make sense to my team — we stopped guessing what the judges wanted and started building to it. If there's one thing I'd add for next year: a worked example of a losing submission and why it lost. Negative examples teach faster than positive ones.",
  },
  {
    id: `${ID_PREFIX}2`,
    name: "Marcus Chen",
    email: null,
    rating: 4,
    hoursAgo: 20,
    message:
      "Loved the sponsor section. The travel reimbursement part is out of date though — the form it links to has been replaced twice since this was written.",
  },
  {
    id: `${ID_PREFIX}3`,
    name: null,
    email: "firsttimer@example.com",
    rating: 2,
    hoursAgo: 52,
    message:
      "Honestly the first three chapters felt like they were written for people who had already done a hackathon. I'm a first-timer and I bounced off the jargon early. Please define terms on first use.",
  },
  {
    id: `${ID_PREFIX}4`,
    name: "Sam Okafor",
    email: null,
    rating: null,
    hoursAgo: 96,
    message: "Short and sweet: more diagrams, fewer walls of text.",
  },
  {
    id: `${ID_PREFIX}5`,
    name: "Dana Whitfield",
    email: "dana@example.com",
    rating: 5,
    hoursAgo: 200,
    message:
      "We ran our internal hackathon straight off this handbook and it saved us a week of arguing about logistics. The team formation chapter in particular is the best writeup of that problem I've read anywhere.",
  },
]);

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function clear() {
  const { count } = await prisma.feedback.deleteMany({
    where: { id: { startsWith: ID_PREFIX } },
  });
  console.log(`Removed ${count} seeded feedback row(s).`);
}

async function seed() {
  for (const { hoursAgo, ...entry } of SAMPLE_FEEDBACK) {
    const createdAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    const data = { ...entry, createdAt };
    await prisma.feedback.upsert({
      where: { id: entry.id },
      update: data,
      create: data,
    });
    console.log(`  ✓ ${entry.name ?? "Anonymous"} — rating ${entry.rating ?? "—"}`);
  }
  console.log(`Seeded ${SAMPLE_FEEDBACK.length} feedback row(s).`);
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — cannot seed feedback.");
  }
  if (process.argv.includes("--clear")) {
    await clear();
    return;
  }
  await seed();
}

main()
  .catch((error) => {
    console.error("[seed-feedback]", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
