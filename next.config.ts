import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimization ──────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── Compression ────────────────────────────────────────────────────────────
  compress: true,

  // ── HTTP Headers for SEO & Performance ─────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers (Google loves secure sites)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      // Cache static assets aggressively (Core Web Vitals)
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|svg|webp|avif|ico|mp4|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // OG Image — cache with revalidation
      {
        source: "/og-image.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // ── Redirects (future: redirect old domain to new) ─────────────────────────
  async redirects() {
    return [
      // Once live, uncomment to redirect www to apex:
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "www.abhaymallick.space" }],
      //   destination: "https://abhaymallick.space/:path*",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
