import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  const profileCompleted = request.cookies.get("profileCompleted")?.value;

  // ── Rule 1: Onboarding already done → skip /onboarding → /dashboard ──
  if (profileCompleted === "true" && url.pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ── Rule 2: Profile not complete → redirect /dashboard → /onboarding ──
  // Note: this uses the same cookie. A future upgrade should use a
  // server-verified session token (e.g. Firebase __session cookie) instead.
  if (profileCompleted !== "true" && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/:path*", "/dashboard/:path*"],
};