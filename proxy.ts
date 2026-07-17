import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, LOGIN_PATH } from "@/constants/admin";
import { ADMIN_COOKIE, verifyToken } from "@/utils/admin-session";

// Optimistic auth check only — it bounces signed-out visitors to the login page
// so they never see a dashboard shell flash. It is NOT the authorization gate:
// proxy does not reliably cover server actions, so every admin page and action
// independently calls requireAdmin(). See utils/admin-auth.ts.

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const signedIn = verifyToken(request.cookies.get(ADMIN_COOKIE)?.value);

  // Already signed in and staring at the login page — send them onward.
  if (pathname === LOGIN_PATH && signedIn) {
    return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
  }

  if (pathname !== LOGIN_PATH && !signedIn) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
