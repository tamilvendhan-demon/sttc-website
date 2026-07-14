import PageShell from "../components/PageShell";

export default function PortalPage() {
  return (
    <PageShell title="Client Portal" description="A secure, modern experience for document upload, appointments, and status tracking.">
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#d8c892] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0b3733]">Portal modules</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                "Secure document upload",
                "Appointment scheduling",
                "Auditor communication",
                "Real-time status tracking",
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-[#d8c892] bg-[#f6f0de] p-6 text-sm text-[#4a473d]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
