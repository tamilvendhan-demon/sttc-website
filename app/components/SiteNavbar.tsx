"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteContent } from "@/app/lib/site";

export default function SiteNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c892]/70 bg-[#f6f0de]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b3733] text-sm font-bold text-white shadow-[0_12px_30px_rgba(11,55,51,0.2)]">
            ST
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#0b3733]">{siteContent.brandName}</p>
            <p className="text-xs text-[#4a473d]">{siteContent.companyName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {siteContent.navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-[#4a473d] transition hover:text-[#0b3733]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Link href="/admin" className="rounded-full border border-[#c99a45]/50 bg-white/60 px-4 py-2 text-sm font-semibold text-[#0b3733] transition hover:bg-[#efe6cc]">
            Login
          </Link>
          <Link href="#contact" className="rounded-full bg-[#0b3733] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(11,55,51,0.18)] transition hover:bg-[#155a50]">
            Book Consultation
          </Link>
        </div>

        <button className="rounded-xl border border-[#d8c892] bg-white/70 p-2 md:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu">
          {isOpen ? <X className="h-5 w-5 text-[#0b3733]" /> : <Menu className="h-5 w-5 text-[#0b3733]" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[#d8c892] bg-[#fefaf1] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {siteContent.navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-[#4a473d]" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="#contact" className="mt-2 rounded-full bg-[#0b3733] px-4 py-2.5 text-center text-sm font-semibold text-white" onClick={() => setIsOpen(false)}>
              Book Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
