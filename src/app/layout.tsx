import React from "react";
import { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import TopNav from "@/components/ui/TopNav";
import NavigationDock from "@/components/sections/NavigationDock";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: "400",
});

export const metadata: Metadata = {
  title: "AJ's Portfolio",
  description: "Showcasing high‑impact engineering work",
  openGraph: {
    title: "AJ - Full‑Stack Engineer Portfolio",
    description: "Explore projects, labs, and analytics.",
    url: "https://ajportfolio.com",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Portfolio",
    description: "Full‑stack engineer with AI expertise",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-primary/30" suppressHydrationWarning>
        {/* Skip link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-zinc-800 text-white px-3 py-2 rounded shadow-lg z-50">
          Skip to content
        </a>
        {/* Top navigation (handles its own route visibility check) */}
        <TopNav />
        {/* Navigation Dock */}
        <NavigationDock />
        {/* Main app root for scroll targets */}
        <div id="app-root" className="relative">
          <main id="main-content" className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
