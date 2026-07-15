# Architecture — Genesis Handbook Demo

Landing site for **Genesis**, an annual community-written hackathon handbook. Single Next.js app (App Router) with a Postgres-backed contributor wall and a feedback form. Deployed on Vercel (project `genesis-handbook-demo`).

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack), React 19.2.4 |
| Styling | Tailwind CSS v4 (PostCSS), custom fonts via `next/font` (Fraunces, Instrument Sans, Geist Mono) |
| Database | Postgres (Supabase) via Prisma 7 + `@prisma/adapter-pg` driver adapter |
| Validation | Zod 4 |
| Hosting | Vercel (cron via `vercel.json`), local dev optionally via Docker (`Dockerfile`, dev-mode only) |

## Current status (2026-07-15)

- Branch: `dev`. Uncommitted: modified `package-lock.json`, untracked `genesis-handbook-phases.md` (planning notes, not wired into the app).
- Recent work: manual contributor seeding + GitHub sync scripts, contributors added to the wall manually (`seed:contributor`).
- Two DB models live (`Contributor`, `Feedback`), 3 migrations applied.
- Hourly Vercel Cron syncs GitHub contributors into the DB; home page revalidates hourly (ISR).
- Known gaps:
  - Rate limiter is in-memory per instance (`utils/rate-limit.ts`) — resets on cold start; noted for swap to Upstash Redis in production.
  - `HandbookStats.topics` is hardcoded to `0` (no topic source yet).
  - Slide 9 ("result") has a placeholder `href="#"` link.
  - README's Discord invite (`discord.gg/NayguCAK`) differs from the code default (`discord.gg/D7CxrmQrqu`) — the env var `NEXT_PUBLIC_DISCORD_INVITE` decides in production. <!-- TODO: confirm which invite is canonical -->

## Directory layout

```
app/
  page.tsx                        # Home (Server Component, revalidate: 3600)
  handbook_v1/                    # Handbook v1 page + data + scoped CSS + TOC client script
  feedback/page.tsx               # Feedback form page
  api/cron/sync-contributors/     # Cron-only GET endpoint (Bearer CRON_SECRET)
  layout.tsx, globals.css, icon.png
actions/
  contributors.ts                 # DB read w/ live-GitHub fallback
  github-contributors.ts          # GitHub REST fetch + stats builder
  sync-contributors.ts            # GitHub → DB upsert (idempotent by githubId)
  feedback.ts                     # "use server" action: honeypot → zod → rate limit → insert
components/
  home/home-scroller.tsx          # Client scroller owning 11 slides
  home/slides/01–11-*.tsx         # Deck slides (04 = contributor wall, 11 = CTA)
  feedback/feedback-form.tsx      # Client form → submitFeedback server action
  nav-dots.tsx, animated-number.tsx
constants/site.ts                 # Public URLs/capacity (NEXT_PUBLIC_* with fallbacks)
prisma/
  schema.prisma                   # Contributor, Feedback
  migrations/                     # 3 migrations
  seed-contributor.mjs            # Manual seed (fetches GitHub user profile)
  sync-github-contributors.mjs    # CLI version of the cron sync
  rls.sql                         # Supabase row-level security
utils/prisma.ts                   # Singleton PrismaClient (pg adapter, pooled URL)
utils/rate-limit.ts               # In-memory sliding window (5 / 10 min / IP)
validations/feedback.ts           # Zod schema + field limits
types/index.ts                    # Contributor, HandbookStats
vercel.json                       # Cron: hourly sync-contributors
```

## Data flow

**Contributor wall (`/`, slide 04):**
1. Vercel Cron `GET /api/cron/sync-contributors` hourly → `syncContributorsFromGitHub()` → upserts GitHub contributors into `Contributor` (auto-approved, keyed by `githubId`).
2. `app/page.tsx` (ISR, 1h) → `getContributorStats()` → reads `approved: true` rows from DB.
3. Fallbacks: DB empty or unreachable → live GitHub fetch (`fetchGitHubContributors`, cached 1h, degrades to empty list on error). The page always renders.
4. Manually-added contributors (via `seed:contributor`) keep `approved: false` until flipped — the approval gate only applies to non-GitHub entries.

**Feedback (`/feedback`):**
`feedback-form.tsx` (client) → `submitFeedback()` server action → honeypot check (`website` field, silently accepts bots) → Zod validation → per-IP rate limit (`x-forwarded-for`) → `Feedback` insert.

## Frontend URLs

### Internal routes (pages)

| URL | What |
|---|---|
| `/` | Home — 11-slide scroller with live contributor wall; cover links to `/handbook_v1` |
| `/handbook_v1` | Handbook v1 — Phase 2/3 community tips (blue-white theme, own fonts/CSS under `app/handbook_v1/`); wall reuses `getContributorStats()`; footer CTA → `/feedback` |
| `/feedback` | Feedback form |

### API endpoints

| URL | Method | Auth | Purpose |
|---|---|---|---|
| `/api/cron/sync-contributors` | GET | `Authorization: Bearer <CRON_SECRET>` (fails closed) | Hourly GitHub → DB contributor sync, invoked by Vercel Cron |

The feedback form does **not** hit a REST endpoint — it POSTs through a Next.js Server Action (`actions/feedback.ts`), so there is no public `/api/feedback` URL.

### External URLs the frontend appends/links to

| URL | Where | Purpose |
|---|---|---|
| `https://api.github.com/repos/{OWNER}/{REPO}/contributors?per_page=100` | `actions/github-contributors.ts` (server-side) | Live contributor fetch; `{OWNER}/{REPO}` from `NEXT_PUBLIC_GITHUB_OWNER`/`NEXT_PUBLIC_GITHUB_REPO`, defaults `JaxzTan/genesis-handbook-demo` |
| `https://api.github.com/users/{username}` | `prisma/seed-contributor.mjs` (CLI) | Fetch profile when seeding a manual contributor |
| `https://avatars.githubusercontent.com/*` | `next.config.ts` `images.remotePatterns` | Contributor avatars rendered through `next/image` |
| `https://github.com/{OWNER}/{REPO}` | Slide 04 "Add yours →" (`CONTRIBUTE_URL`) | Default contribute link, overridable via `NEXT_PUBLIC_CONTRIBUTE_URL` |
| `https://discord.gg/D7CxrmQrqu` | Slide 11 CTA (`DISCORD_INVITE`) | Default Discord invite, overridable via `NEXT_PUBLIC_DISCORD_INVITE` |
| `contributor.profileUrl` (per-row) | Slide 04 wall tiles | Links each avatar to the contributor's GitHub profile |

## Data model

```prisma
Contributor { id, githubId? @unique, name, avatarUrl?, profileUrl?, role?,
              contributions @default(0), approved @default(false), createdAt }
Feedback    { id, name?, email?, rating?, message, createdAt @@index([createdAt]) }
```

## Environment variables

| Var | Scope | Purpose |
|---|---|---|
| `DATABASE_URL` | server | Pooled Postgres (Supabase :6543) — runtime |
| `DIRECT_URL` | server | Session Postgres (:5432) — Prisma CLI/migrations |
| `CRON_SECRET` | server | Bearer token for the cron endpoint; endpoint rejects if unset |
| `GITHUB_TOKEN` | server | Optional — raises GitHub API limit 60→5000 req/hr |
| `NEXT_PUBLIC_DISCORD_INVITE` | client | CTA Discord link |
| `NEXT_PUBLIC_CONTRIBUTE_URL` | client | "Add yours →" target (defaults to repo URL) |
| `NEXT_PUBLIC_GITHUB_OWNER` / `NEXT_PUBLIC_GITHUB_REPO` | client+server | Repo the wall pulls from |
| `HOSTNAME` / `PORT` | dev | Dev server binding |

## Commands

```bash
npm run dev                 # Next dev server (or: docker build + run, dev-mode image)
npm run build               # prisma generate && next build
npm run seed:contributor    # Manually add a contributor by GitHub username
npm run sync:contributors   # One-off GitHub → DB sync (CLI twin of the cron)
npm run lint
```
