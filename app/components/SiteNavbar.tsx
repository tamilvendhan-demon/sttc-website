"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteContent } from "@/app/lib/site";

export default function SiteNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            AP
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">{siteContent.brandName}</p>
            <p className="text-xs text-slate-500">{siteContent.companyName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteContent.navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="#contact" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Book Consultation
          </Link>
        </div>

        <button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {siteContent.navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="#contact" className="rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white" onClick={() => setIsOpen(false)}>
              Book Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
