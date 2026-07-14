import Link from "next/link";
import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <section className="border-b border-[#d8c892] bg-[#0b3733] py-20 text-[#f6f0de]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e7c97c]">AuditPro India</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#dfe8e4]">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-[#c99a45] px-5 py-3 text-sm font-semibold text-[#0b3733]">Back Home</Link>
            <Link href="/services" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">View Services</Link>
          </div>
        </div>
      </section>
      {children}
    </main>
  );
}
