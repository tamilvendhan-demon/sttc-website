"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ClientLoginSection() {
  const [mode, setMode] = useState<"client" | "auditor">("client");

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#d8c892] bg-[#0b3733] p-8 text-[#f6f0de] shadow-[0_22px_60px_rgba(11,55,51,0.15)] lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e7c97c]">Secure Access</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Client and auditor access, built for modern compliance workflows.</h2>
              <p className="mt-5 text-lg leading-8 text-[#dfe8e4]">
                Provide secure login experiences for clients, auditors, and administrators with a premium portal-first interface.
              </p>
              <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 p-1">
                <button className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "client" ? "bg-[#c99a45] text-[#0b3733]" : "text-[#f6f0de]"}`} onClick={() => setMode("client")}>Client Login</button>
                <button className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "auditor" ? "bg-[#c99a45] text-[#0b3733]" : "text-[#f6f0de]"}`} onClick={() => setMode("auditor")}>Auditor Login</button>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/10 p-8 backdrop-blur">
              <div className="flex items-center gap-2 text-[#e7c97c]">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">{mode === "client" ? "Client Portal" : "Auditor Dashboard"}</span>
              </div>
              <div className="mt-6 space-y-4">
                <input className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-[#0b3733] outline-none" placeholder={mode === "client" ? "Client email or mobile" : "Auditor email"} />
                <input className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-[#0b3733] outline-none" placeholder="Password" type="password" />
                <button className="inline-flex items-center gap-2 rounded-full bg-[#c99a45] px-5 py-3 text-sm font-semibold text-[#0b3733]">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <Link href="/portal" className="mt-6 inline-flex text-sm font-semibold text-[#e7c97c]">Open portal preview →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
