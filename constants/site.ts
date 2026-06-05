// Public site constants. NEXT_PUBLIC_* values are inlined into the client
// bundle, so this module is safe to import from both server and client code.
// Use `||` (not `??`) so an empty-but-defined env var (e.g. a blank line copied
// from .env.example) still falls back to the default instead of breaking links.
export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/D7CxrmQrqu";

// Number of slides in the home deck (drives the side nav dots).
export const SLIDE_COUNT = 11;

// Target size of the inaugural contributor cohort (the wall capacity).
export const CONTRIBUTOR_CAPACITY = 30;

// GitHub repo the contributor wall pulls live avatars from.
export const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || "JaxzTan";
export const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "genesis-handbook-demo";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

// Where the "Add yours →" button on the contributor wall points. Defaults to
// the GitHub repo so a new commit lands the contributor on the wall.
export const CONTRIBUTE_URL =
  process.env.NEXT_PUBLIC_CONTRIBUTE_URL || GITHUB_REPO_URL;
