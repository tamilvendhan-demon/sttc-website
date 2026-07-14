import Link from "next/link";
import { siteContent } from "@/app/lib/site";

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">{siteContent.brandName}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
            {siteContent.companyName} delivers high-quality tax, audit, and business advisory services with a modern client experience.
          </p>
        </div>

        {siteContent.footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-6 pt-6 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 {siteContent.companyName}. All rights reserved.</p>
        <p>support@auditproindia.com • +91 98765 43210</p>
      </div>
    </footer>
  );
}
