import { NextResponse } from "next/server";

/**
 * Generates a cryptographically random nonce (base64url, 16 bytes).
 * Used to allow only our explicitly-nonce'd scripts in the CSP.
 */
function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64url");
}

/**
 * Builds a strict Content-Security-Policy header value.
 *
 * Domains covered:
 *  - Firebase / Firestore / Auth / Storage
 *  - Google Analytics / Tag Manager
 *  - Google reCAPTCHA (phone auth)
 *  - Google Fonts
 *  - Google OAuth popup
 *  - Images served by the app
 */
function buildCSP(nonce) {
  const directives = [
    `default-src 'self'`,

    // Scripts: same-origin + our nonce + GTM + reCAPTCHA + Google APIs
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://apis.google.com`,

    // Styles: unsafe-inline kept for Tailwind / React inline styles + Google Fonts
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,

    // Fonts
    `font-src 'self' https://fonts.gstatic.com`,

    // Images
    `img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://lh3.googleusercontent.com https://sayzo.in https://www.sayzo.in https://www.googletagmanager.com https://www.google-analytics.com https://server.arcgisonline.com`,

    // XHR / fetch / WebSocket: Firebase SDKs + GA
    `connect-src 'self' https://*.googleapis.com https://*.firebaseapp.com https://*.firebase.com https://www.google-analytics.com https://analytics.google.com wss://*.firebaseio.com`,

    // Frames: reCAPTCHA widget + Google OAuth + Firebase auth domain
    `frame-src 'self' https://www.google.com https://accounts.google.com https://*.firebaseapp.com`,

    // Hard blocks
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,

    // Upgrade all HTTP sub-resources to HTTPS
    `upgrade-insecure-requests`,
  ];

  return directives.join("; ");
}

export function middleware(request) {
  const url = request.nextUrl;
  const nonce = generateNonce();

  // ── Routing rules ──────────────────────────────────────────────────────────
  const profileCompleted = request.cookies.get("profileCompleted")?.value;
  const isDev = process.env.NODE_ENV === "development";
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (profileCompleted === "true" && url.pathname.startsWith("/onboarding")) {
    const res = NextResponse.redirect(new URL("/dashboard", request.url));
    res.headers.set("Content-Security-Policy", buildCSP(nonce));
    return res;
  }

  if (profileCompleted !== "true" && url.pathname.startsWith("/dashboard") && !) {
    const res = NextResponse.redirect(new URL("/onboarding", request.url));
    res.headers.set("Content-Security-Policy", buildCSP(nonce));
    return res;
  }

  // ── Pass nonce downstream so layout.js can attach it to <Script> tags ──────
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", buildCSP(nonce));

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
