import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
const BASE_URL = "https://www.abhaymallick.space";

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Abhay Mallick | Freelance Full Stack Developer & Software Engineer",
    template: "%s | Abhay Mallick",
  },

  // ── Description (max ~155 chars) ───────────────────────────────────────────
  description:
    "Abhay Mallick — Freelance Full Stack Developer & Software Engineer from Chandrapur, Maharashtra. Specializing in Next.js, React, Node.js, and Android (Kotlin) development. 50+ projects delivered.",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "Abhay Mallick",
    "Full Stack Developer India",
    "Next.js Developer India",
    "Android Developer",
    "Software Engineer Chandrapur",
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
    siteName: "Abhay Mallick — Freelance Full Stack Developer & Software Engineer",
    title: "Abhay Mallick | Freelance Full Stack Developer & Software Engineer",
    description:
      "Abhay Mallick — Freelance Full Stack Developer & Software Engineer from Chandrapur, Maharashtra. React, Next.js, Node.js, Android (Kotlin), and AI integrations. 50+ projects delivered.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Abhay Mallick — Freelance Full Stack Developer & Software Engineer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Cards ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Abhay Mallick | Freelance Full Stack Developer & Software Engineer",
    description:
      "Abhay Mallick — Freelance Full Stack Developer & Software Engineer from Chandrapur, Maharashtra. React, Next.js, Node.js, Android & AI integrations. 50+ projects delivered.",
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
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: ["/icon.png"],
  },

  // ── Verification ───────────────────────────────────────────────────────────
  verification: {
    google: "K4CF1UPY4n8vghCQbDZGwuIpVJMPwNGLUm4D9LcgviY",
  },

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
      suppressHydrationWarning
    >
      <head>
        {/* Favicon & Google Site Icon Links */}
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />

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
        
        {/* Visual-hidden SEO Indexing Headers & Content for search engine crawlers */}
        <div 
          className="sr-only" 
          style={{ 
            position: 'absolute', 
            width: '1px', 
            height: '1px', 
            padding: 0, 
            margin: '-1px', 
            overflow: 'hidden', 
            clip: 'rect(0,0,0,0)', 
            whiteSpace: 'nowrap', 
            border: 0 
          }}
        >
          <h1>Abhay Mallick — Freelance Full Stack Developer &amp; Software Engineer</h1>
          <h2>About Abhay Mallick</h2>
          <p>
            I am a professional freelance full-stack developer and software engineer based in Chandrapur, Maharashtra, India. With experience in Next.js, React, Node.js, and Android (Kotlin) development, I build robust digital products, custom CRM platforms, SaaS applications, and interactive web solutions for clients worldwide.
          </p>
          <p>
            Specializing in high-performance web applications and backend systems, I deliver clean code, optimized databases, and seamless user experiences. Contact me for contract development and engineering services.
          </p>
        </div>

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
