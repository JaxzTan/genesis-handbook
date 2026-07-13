// Manually-curated contributors for the wall (Supabase Contributor table).
//
// These are people who aren't picked up by the GitHub repo sync
// (see prisma/sync-github-contributors.mjs). Edit this list to add/remove
// people; `npm run seed:contributor` reads it and upserts each one.
//
// - username: GitHub login (used to fetch id/name/avatar/profile from GitHub)
// - role:     optional label shown on the wall (翻译 / 第3章 / 校对…), or null

export type ManualContributor = {
  username: string;
  role: string | null;
};

export const MANUAL_CONTRIBUTORS: readonly ManualContributor[] = [
  { username: "jaycigan05", role: null },
  { username: "nizarsyahmi37", role: null },
  { username: "yaphaojian", role: null },
  { username: "locorocorolling", role: null },
  { username: "ethanlxz", role: null },
  { username: "mewHacks", role: null },
];
