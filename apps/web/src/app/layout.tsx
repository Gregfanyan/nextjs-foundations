import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

// variable font, self-hosted at build time; size-adjusted fallback avoids CLS
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-inter",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "ACME Corporation";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  title: {
    default: "Vercel Swag Store",
    template: "%s | Vercel Swag Store",
  },
  description: "Premium developer apparel, accessories, and gear.",
  openGraph: {
    type: "website",
    siteName: appName,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Suspense
          fallback={<header className="h-16 border-b border-zinc-200" />}
        >
          <SiteHeader />
        </Suspense>
        {children}
        <footer className="border-t border-zinc-200 px-5 py-8 text-center text-sm text-zinc-600">
          © 2026 Vercel Swag Store
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
