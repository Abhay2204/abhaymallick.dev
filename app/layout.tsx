import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── Canonical Domain ──────────────────────────────────────────────────────────
const BASE_URL = "https://abhaymallick.space";

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Abhay Mallick | Full Stack Developer — React, Next.js & Mobile Apps",
    template: "%s | Abhay Mallick",
  },

  // ── Description (max ~155 chars) ───────────────────────────────────────────
  description:
    "Abhay Mallick — Full Stack Developer from Chandrapur, Maharashtra. Expert in React, Next.js, Node.js, Android (Kotlin), and AI integrations. 2+ years, 50+ projects delivered. Hire me for CRMs, ecommerce, SaaS & mobile apps.",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    // Local SEO
    "full stack developer chandrapur",
    "full stack developer maharashtra",
    "web developer chandrapur",
    "software developer chandrapur maharashtra",
    "freelance developer chandrapur",
    "hire developer india",
    // Service keywords
    "hire full stack developer india",
    "freelance full stack developer india",
    "next.js developer india",
    "react developer freelance india",
    "node.js developer india",
    "crm development india",
    "mobile app developer india",
    "android developer india",
    "kotlin developer india",
    "ai web application developer",
    "ui ux designer developer india",
    "ecommerce website developer india",
    "saas developer india",
    "enterprise software developer india",
    // Brand / Long-tail
    "abhay mallick",
    "abhay mallick developer",
    "abhay mallick full stack",
    "abhaymallick.space",
    "portfolio full stack developer 2025 2026",
    "next.js react portfolio india",
    "computer science engineer developer portfolio",
  ],

  // ── Canonical & Alternates ─────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Authors & Creator ──────────────────────────────────────────────────────
  authors: [{ name: "Abhay Mallick", url: BASE_URL }],
  creator: "Abhay Mallick",
  publisher: "Abhay Mallick",
  category: "Technology",

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Abhay Mallick — Full Stack Developer",
    title: "Abhay Mallick | Full Stack Developer — React, Next.js & Mobile Apps",
    description:
      "Full Stack Developer from Chandrapur, Maharashtra. Expert in React, Next.js, Node.js, Android & AI. 50+ projects delivered. Available for freelance.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Abhay Mallick — Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Cards ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Abhay Mallick | Full Stack Developer",
    description:
      "Full Stack Developer from India. React, Next.js, Node.js, Android, AI. 50+ projects. Available for freelance work.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@abhay_as_u_like_it",
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.ico" },
    ],
  },

  // ── Verification (fill in after registering) ───────────────────────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  // },

  // ── Other ──────────────────────────────────────────────────────────────────
  applicationName: "Abhay Mallick Portfolio",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(BASE_URL),
};

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Structured Data (JSON-LD) */}
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
