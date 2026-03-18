/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "www.sayzo.in" },
      { protocol: "https", hostname: "sayzo.in" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — never render this site inside an iframe
          { key: "X-Frame-Options", value: "DENY" },

          // Stop browsers from MIME-sniffing the response content-type
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Enforce HTTPS for 2 years; include subdomains; allow preload
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Only send origin when navigating to same origin; nothing cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Restrict access to sensitive browser APIs
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=(self)",
              "interest-cohort=()", // disable FLoC
            ].join(", "),
          },

          // CSP is applied per-request with a nonce via middleware.js
          // so it is intentionally omitted here (middleware takes precedence).
        ],
      },
    ];
  },
};

export default nextConfig;
