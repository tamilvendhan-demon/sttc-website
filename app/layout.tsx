import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KALA LINK AI — Thedal",
  description: "AI-powered cataloguing and market linkage for marginalized artisans.",
  keywords: ["KALA LINK AI", "Thedal", "artisans", "AI catalogue", "market linkage", "Smart India Hackathon"],
  applicationName: "KALA LINK AI",
  generator: "Next.js",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f8fafc] text-[#0f172a]">{children}</body>
    </html>
  );
}
