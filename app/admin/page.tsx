import { loadLeads } from "@/app/lib/leadStore";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const leads = await loadLeads();

  return (
    <main className="min-h-screen bg-[#f6f0de] px-6 py-16 text-[#0b3733] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Client booking dashboard</h1>
            <p className="mt-3 max-w-2xl text-lg text-[#4a473d]">
              Every consultation request from the website is stored here so you can follow up promptly.
            </p>
          </div>
          <Link href="/" className="rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de]">
            Back to website
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#d8c892] bg-white shadow-sm">
          <div className="border-b border-[#efe6cc] bg-[#fbf8f2] px-6 py-4">
            <p className="text-lg font-semibold">Recent consultation leads</p>
            <p className="text-sm text-[#4a473d]">{leads.length} total requests</p>
          </div>
          {leads.length === 0 ? (
            <div className="p-8 text-[#4a473d]">No leads yet. New consultation requests will appear here.</div>
          ) : (
            <div className="divide-y divide-[#efe6cc]">
              {leads.map((lead) => (
                <div key={lead.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:items-start">
                  <div>
                    <p className="text-lg font-semibold text-[#0b3733]">{lead.name}</p>
                    <p className="mt-1 text-sm text-[#4a473d]">{lead.email}</p>
                    <p className="text-sm text-[#4a473d]">{lead.phone}</p>
                    <p className="mt-3 text-sm leading-7 text-[#4a473d]">{lead.notes || "No extra notes provided."}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c99a45]">Service</p>
                    <p className="mt-2 text-sm text-[#0b3733]">{lead.service}</p>
                    <p className="mt-3 text-sm text-[#4a473d]">Preferred slot: {lead.preferredSlot || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c99a45]">Source</p>
                    <p className="mt-2 text-sm text-[#0b3733]">{lead.source === "appointment" ? "Appointment form" : "Contact form"}</p>
                    <p className="mt-3 text-sm text-[#4a473d]">{new Date(lead.createdAt).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
