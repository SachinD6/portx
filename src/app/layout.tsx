import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { CursorCompanion } from "@/components/effects/cursor-companion";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { ChapterRail } from "@/components/layout/chapter-rail";
import { GrainOverlay } from "@/components/layout/grain-overlay";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
import { AppProviders } from "@/components/providers/app-providers";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <AppProviders>
          <SiteAnalytics />
          <GrainOverlay />
          <ScrollProgress />
          <CursorCompanion />
          <SiteHeader />
          <ChapterRail />
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          <div className="relative z-10">
            <SiteFooter />
          </div>
          <CommandPalette />
        </AppProviders>
      </body>
    </html>
  );
}
