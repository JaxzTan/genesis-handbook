// Single source of truth for admin routes.
//
// These live in a plain constants module — free of `server-only` and
// `next/headers` — because `proxy.ts` needs them too, and proxy runs outside
// the render path. Changing a path here moves the route everywhere: proxy
// redirects, requireAdmin(), the login form, and revalidation.
//
// Keep in sync with the directory names under app/admin/.

export const ADMIN_PATH = "/admin/admine";
export const LOGIN_PATH = "/admin/admine/login";
