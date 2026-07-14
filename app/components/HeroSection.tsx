import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, FileCheck2 } from "lucide-react";
import { siteContent } from "@/app/lib/site";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_40%),linear-gradient(135deg,_#0f172a_0%,_#111827_100%)] py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Secure, compliant, and trusted by growing businesses
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Premium tax, audit, and compliance services for India.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            {siteContent.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Schedule an Appointment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#services" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore Services
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {siteContent.heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="rounded-[28px] bg-white p-6 text-slate-900">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-green-100 p-3 text-green-700">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Why clients trust us</p>
                <p className="text-lg font-semibold">Fast, accurate, compliant</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                "Pan, Aadhaar, GST, and TDS support under one roof",
                "Expert-led filing and audit execution with clear timelines",
                "Dedicated support for startups, SMEs, and professionals",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 text-blue-600" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
