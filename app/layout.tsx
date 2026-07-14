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
  title: "AuditPro India | Tax, GST, Audit & Compliance Consultancy",
  description: "Premium tax, GST, audit, bookkeeping, and company registration consultancy services for individuals and businesses in India.",
  keywords: ["tax consultancy", "GST", "income tax", "audit", "company registration", "TDS", "bookkeeping"],
  metadataBase: new URL("https://auditproindia.com"),
  openGraph: {
    title: "AuditPro India",
    description: "Professional tax and compliance consultancy services in India.",
    type: "website",
    url: "https://auditproindia.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuditPro India",
    description: "Professional tax and compliance consultancy services in India.",
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
