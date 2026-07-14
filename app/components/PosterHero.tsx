import { ArrowRight, BadgeCheck, Building2, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PosterHero() {
  return (
    <section className="relative overflow-hidden bg-[#f6f0de] py-20 text-[#1e1b14] lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,154,69,0.25),_transparent_34%),linear-gradient(120deg,_rgba(11,55,51,0.06),_rgba(255,255,255,0))]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#155a50]">Sree Thirumurugan Tax Consultancy</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#0b3733] sm:text-5xl lg:text-6xl">
            Your trusted partner for <span className="text-[#c99a45]">tax, audit, and business growth</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a473d]">
            We deliver premium compliance, financial clarity, and strategic advisory services for individuals, startups, SMEs, and growing enterprises across India.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3733] px-6 py-3 text-sm font-semibold text-[#f6f0de] transition hover:bg-[#155a50]">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#services" className="inline-flex items-center justify-center rounded-full border border-[#c99a45] px-6 py-3 text-sm font-semibold text-[#0b3733] transition hover:bg-[#efe6cc]">
              Explore Services
            </Link>
          </div>
        </div>

        <div className="rounded-[30px] border border-[#d8c892] bg-[#efe6cc] p-8 shadow-[0_24px_60px_rgba(11,55,51,0.14)]">
          <div className="flex items-center justify-between rounded-2xl border border-[#c99a45]/40 bg-[#f6f0de] p-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#155a50]">AuditPro India</p>
              <p className="mt-1 text-xl font-semibold text-[#0b3733]">Professional & Reliable</p>
            </div>
            <div className="rounded-2xl bg-[#0b3733] p-3 text-[#f6f0de]">
              <Building2 className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: BadgeCheck, label: "GST & Income Tax" },
              { icon: Landmark, label: "Audit & Accounting" },
              { icon: ShieldCheck, label: "Company Registration" },
              { icon: Building2, label: "Loan Consultancy" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-[#d8c892] bg-white/70 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b3733] text-[#f6f0de]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#0b3733]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
