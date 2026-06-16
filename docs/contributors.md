# Adding contributors to the wall

The contributor wall (slide S4 on the landing page) shows everyone who's helped
build the handbook. This doc explains how people get there and how to add
someone manually.

## How the wall gets populated

The wall reads from two sources, in order
([`actions/contributors.ts`](../actions/contributors.ts)):

1. **The database** — approved rows in the `Contributor` table. This is the
   primary source.
2. **Live GitHub fallback** — if the DB is empty or unreachable, the wall fetches
   the repo's contributors straight from GitHub so the page still renders.

A row only shows on the wall when `approved = true`.

## The three ways onto the wall

| Path | How it works | Use it for |
|------|--------------|-----------|
| **Commit to the repo** | Someone pushes a commit to GitHub. The hourly cron sync ([`app/api/cron/sync-contributors/route.ts`](../app/api/cron/sync-contributors/route.ts)) pulls repo contributors into the DB, auto-approved. | People actually contributing code. |
| **Manual seed** | Add them to [`prisma/contributors.ts`](../prisma/contributors.ts) and run the seed. Auto-approved. | People you want on the wall who **aren't** committing to the repo. |
| **Live fallback** | Automatic, only when the DB is empty. No action needed. | Safety net before the first sync. |

> The **"Add yours →"** link on the wall is just a link to the GitHub repo
> (`CONTRIBUTE_URL` in [`constants/site.ts`](../constants/site.ts)). It does **not**
> add anyone — it nudges visitors to go contribute, after which the sync picks
> them up.

## Adding someone manually (the common case)

For people who won't commit to the repo but should still appear on the wall:

### 1. Add them to the list

Edit [`prisma/contributors.ts`](../prisma/contributors.ts):

```ts
export const MANUAL_CONTRIBUTORS: readonly ManualContributor[] = [
  { username: "jaycigan05", role: null },
  { username: "nizarsyahmi37", role: null },
  { username: "yaphaojian", role: null },
  { username: "their-github-username", role: "翻译" }, // ← add a line
];
```

- **`username`** — their GitHub login. The seed fetches their id, display name,
  avatar, and profile URL from the GitHub API automatically.
- **`role`** — an optional label (e.g. `"翻译"`, `"第3章"`, `"校对"`), or `null`.

### 2. Run the seed

```bash
npm run seed:contributor
```

This loops over the list and upserts each person. It's keyed by GitHub id, so
**re-running is safe** — it updates existing rows instead of creating duplicates.

To seed just one person without editing the file:

```bash
node prisma/seed-contributor.mjs <github-username> [role]
```

### Requirements

- `DATABASE_URL` must be set in `.env` (points at the Supabase Postgres).
- `GITHUB_TOKEN` is optional but recommended — without it you share the
  unauthenticated GitHub rate limit (60 requests/hour).

## Verifying

After seeding, reload the landing page — the new avatars appear on the wall, and
the **Contributors** counter goes up. Each avatar links to that person's GitHub
profile.

## Removing someone

Delete their line from [`prisma/contributors.ts`](../prisma/contributors.ts) and
delete their row from the DB (the seed only adds/updates, it never removes). The
hourly sync leaves manually-seeded contributors alone, so they won't reappear.
