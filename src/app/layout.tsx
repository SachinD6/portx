import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

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
          <GrainOverlay />
          <SiteHeader />
          <div className="relative z-0 flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <CommandPalette />
        </AppProviders>
      </body>
    </html>
  );
}
