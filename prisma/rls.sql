-- Lock down the Supabase auto-exposed REST API (PostgREST).
--
-- This app reaches Postgres ONLY through Prisma as the `postgres` role, which
-- bypasses row-level security. Supabase, however, also exposes every table in
-- the `public` schema over its REST API using the public `anon` key. With RLS
-- disabled those tables are world-readable/writable ("Unrestricted").
--
-- Enabling RLS with NO policies = default-deny for anon/authenticated (REST),
-- while the `postgres` role the app connects as continues to bypass it. Net
-- effect: the app is unaffected, the public REST surface is closed.
--
-- Re-runnable: ENABLE ROW LEVEL SECURITY is idempotent.

ALTER TABLE "Contributor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Feedback"    ENABLE ROW LEVEL SECURITY;
