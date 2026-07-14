"use client";

import { ArrowRight, CalendarDays, FileText, MessageSquareText, ShieldCheck } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: FileText, title: "Secure Document Upload", text: "Upload PAN, Aadhaar, GST, and financial documents with ease." },
  { icon: CalendarDays, title: "Appointment Booking", text: "Schedule consultation slots and receive status updates." },
  { icon: MessageSquareText, title: "Auditor Chat", text: "Communicate with your assigned consultant directly." },
  { icon: ShieldCheck, title: "Real-Time Tracking", text: "Track filing status, invoices, and reminders in one place." },
];

export default function ClientPortalPreview() {
  return (
    <section className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#d8c892] bg-[#0b3733] p-8 text-[#f6f0de] shadow-[0_24px_70px_rgba(11,55,51,0.16)] lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e7c97c]">Client Portal</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                A modern portal experience for every client.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#dfe8e4]">
                Our platform experience brings appointment booking, secure document handling, real-time status monitoring, and communication into one premium workflow.
              </p>
              <Link href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c99a45] px-5 py-3 text-sm font-semibold text-[#0b3733] transition hover:bg-[#e7c97c]">
                Explore Portal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c99a45] text-[#0b3733]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#dfe8e4]">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
