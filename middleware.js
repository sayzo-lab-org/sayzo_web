import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // Read onboarding flag from cookie
  const profileCompleted = request.cookies.get("profileCompleted")?.value;

  // If user already completed onboarding
  if (profileCompleted === "true" && url.pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/:path*" , "/dashboard/:path*"],
};