import { loadLeads } from "@/app/lib/leadStore";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const leads = await loadLeads();
  const newCount = leads.filter((lead) => (lead.status || "new") === "new").length;
  const qualifiedCount = leads.filter((lead) => (lead.status || "new") === "qualified").length;
  const ownershipReadyCount = leads.filter((lead) => lead.ownershipTransferReady).length;
  const businessCount = leads.filter((lead) => (lead.customerType || "individual") === "business").length;
  const individualCount = leads.filter((lead) => (lead.customerType || "individual") === "individual").length;

  return (
    <main className="min-h-screen bg-[#f6f0de] px-6 py-16 text-[#0b3733] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Client ownership dashboard</h1>
            <p className="mt-3 max-w-2xl text-lg text-[#4a473d]">
              All customer details submitted from the website contact and appointment forms are captured here for review, follow-up, and future ownership transfer.
            </p>
          </div>
          <Link href="/" className="rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de]">
            Back to website
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <div className="rounded-[24px] border border-[#d8c892] bg-[#0b3733] p-5 text-[#f6f0de] shadow-lg shadow-[#0b3733]/10">
            <p className="text-sm uppercase tracking-[0.24em] text-[#e7c97c]">Total leads</p>
            <p className="mt-4 text-3xl font-semibold">{leads.length}</p>
          </div>
          <div className="rounded-[24px] border border-[#d8c892] bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c99a45]">New</p>
            <p className="mt-4 text-3xl font-semibold text-[#0b3733]">{newCount}</p>
          </div>
          <div className="rounded-[24px] border border-[#d8c892] bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c99a45]">Qualified</p>
            <p className="mt-4 text-3xl font-semibold text-[#0b3733]">{qualifiedCount}</p>
          </div>
          <div className="rounded-[24px] border border-[#d8c892] bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c99a45]">Business</p>
            <p className="mt-4 text-3xl font-semibold text-[#0b3733]">{businessCount}</p>
          </div>
          <div className="rounded-[24px] border border-[#d8c892] bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c99a45]">Ready transfer</p>
            <p className="mt-4 text-3xl font-semibold text-[#0b3733]">{ownershipReadyCount}</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#d8c892] bg-white shadow-[0_18px_60px_rgba(11,55,51,0.08)]">
          <div className="border-b border-[#efe6cc] bg-[#fbf8f2] px-6 py-4">
            <p className="text-lg font-semibold">Recent consultation leads</p>
            <p className="text-sm text-[#4a473d]">{qualifiedCount} qualified leads ready for follow-up</p>
          </div>
          {leads.length === 0 ? (
            <div className="p-8 text-[#4a473d]">No leads yet. New consultation requests will appear here.</div>
          ) : (
            <div className="divide-y divide-[#efe6cc]">
              {leads.map((lead) => (
                <div key={lead.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.2fr_0.8fr_1fr] md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold text-[#0b3733]">{lead.name}</p>
                      <span className="rounded-full bg-[#f3e7c8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0b3733]">{lead.customerCode}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#4a473d]">{lead.email}</p>
                    <p className="text-sm text-[#4a473d]">{lead.phone}</p>
                    <p className="mt-3 text-sm leading-7 text-[#4a473d]">{lead.notes || "No extra notes provided."}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c99a45]">Service</p>
                    <p className="mt-2 text-sm text-[#0b3733]">{lead.service}</p>
                    <p className="mt-3 text-sm text-[#4a473d]">Preferred slot: {lead.preferredSlot || "Not specified"}</p>
                    <p className="mt-2 text-sm text-[#4a473d]">Client type: {lead.customerType || "individual"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c99a45]">Status</p>
                    <p className="mt-2 text-sm text-[#0b3733]">{(lead.status || "new").replace("-", " ")}</p>
                    <p className="mt-2 text-sm text-[#4a473d]">Company: {lead.companyName || "Not provided"}</p>
                    <p className="mt-2 text-sm text-[#4a473d]">Transfer ready: {lead.ownershipTransferReady ? "Yes" : "No"}</p>
                    <p className="mt-2 text-sm text-[#4a473d]">Follow-up: {lead.followUpDate || "Not scheduled"}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#155a50]">{lead.source === "appointment" ? "Appointment form" : "Contact form"}</p>
                    <p className="mt-2 text-xs text-[#4a473d]">{new Date(lead.createdAt).toLocaleString("en-IN")}</p>
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
