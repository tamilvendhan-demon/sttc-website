import { ArrowRight, BadgeCheck, Building2, Landmark, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function PosterHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#f6f0de] py-20 text-[#1e1b14] lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,154,69,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(11,55,51,0.12),_transparent_28%),linear-gradient(120deg,_rgba(11,55,51,0.06),_rgba(255,255,255,0))]" />
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#c99a45]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c99a45]/50 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#155a50] shadow-lg shadow-[#0b3733]/5">
            <Sparkles className="h-3.5 w-3.5" />
            Sree Thirumurugan Tax Consultancy
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.04] text-[#0b3733] sm:text-5xl lg:text-6xl">
            Trusted tax guidance for <span className="text-[#c99a45]">businesses, professionals, and families</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a473d]">
            From GST filing and income tax planning to audits, registrations, and business advisory, we simplify compliance and protect your growth with clarity and precision.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3733] px-6 py-3 text-sm font-semibold text-[#f6f0de] shadow-[0_16px_32px_rgba(11,55,51,0.25)] transition hover:-translate-y-0.5 hover:bg-[#155a50]">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#services" className="inline-flex items-center justify-center rounded-full border border-[#c99a45] bg-white/60 px-6 py-3 text-sm font-semibold text-[#0b3733] transition hover:-translate-y-0.5 hover:bg-[#efe6cc]">
              Explore Services
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-[#0b3733]">
            <span className="rounded-full border border-[#d8c892] bg-white/70 px-3 py-2 shadow-sm">PAN / GST / TDS support</span>
            <span className="rounded-full border border-[#d8c892] bg-white/70 px-3 py-2 shadow-sm">Audit ready documentation</span>
            <span className="rounded-full border border-[#d8c892] bg-white/70 px-3 py-2 shadow-sm">Prompt follow-up</span>
          </div>
        </div>

        <div className="relative z-10 mt-6 lg:mt-0">
          <div className="relative rounded-[32px] border border-[#d8c892] bg-[#efe6cc] p-6 shadow-[0_28px_80px_rgba(11,55,51,0.14)] transform-gpu rotate-1">
            <div className="absolute -left-4 top-8 h-20 w-20 rounded-full bg-[#c99a45]/25 blur-2xl" />
            <div className="absolute -right-6 bottom-8 h-20 w-20 rounded-full bg-[#0b3733]/15 blur-2xl" />
            <div className="relative flex items-center justify-between rounded-2xl border border-[#c99a45]/40 bg-[#f6f0de] p-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#155a50]">AuditPro India</p>
                <p className="mt-1 text-xl font-semibold text-[#0b3733]">Professional & Reliable</p>
              </div>
              <div className="rounded-2xl bg-[#0b3733] p-3 text-[#f6f0de] shadow-lg shadow-[#0b3733]/20">
                <Building2 className="h-6 w-6" />
              </div>
            </div>

            <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: BadgeCheck, label: "GST & Income Tax" },
                { icon: Landmark, label: "Audit & Accounting" },
                { icon: ShieldCheck, label: "Company Registration" },
                { icon: TrendingUp, label: "Loan Consultancy" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-[#d8c892] bg-white/80 p-4 shadow-[0_12px_30px_rgba(11,55,51,0.08)] transition hover:-translate-y-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b3733] text-[#f6f0de]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#0b3733]">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-6 rounded-2xl border border-[#d8c892] bg-[#0b3733] p-4 text-[#f6f0de] shadow-[0_18px_40px_rgba(11,55,51,0.18)]">
              <p className="text-xs uppercase tracking-[0.28em] text-[#e7c97c]">Client success</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold">500+</p>
                  <p className="text-sm text-[#dfe8e4]">clients guided</p>
                </div>
                <div className="rounded-xl bg-[#c99a45] px-2 py-1 text-xs font-semibold text-[#0b3733]">98% on-time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
