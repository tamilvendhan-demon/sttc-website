import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THEDAL | AI Market Linkage for Artisans",
  description: "AI-powered cataloguing and market discovery for marginalized artisans.",
  keywords: ["THEDAL", "artisans", "AI catalogue", "market linkage", "Smart India Hackathon"],
  metadataBase: new URL("https://sttc-website-y9y4-df8kh0adn-tamilvendhan-demons-projects.vercel.app"),
  openGraph: {
    title: "THEDAL",
    description: "AI-powered cataloguing and market discovery for artisans.",
    type: "website",
    url: "https://sttc-website-y9y4-df8kh0adn-tamilvendhan-demons-projects.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "THEDAL",
    description: "AI-powered cataloguing and market discovery for artisans.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f8fafc] text-[#0f172a]">{children}</body>
    </html>
  );
}
