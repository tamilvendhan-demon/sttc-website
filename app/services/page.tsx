import PageShell from "../components/PageShell";

const services = [
  { title: "Income Tax Filing", description: "Professional ITR preparation, tax planning, and compliance support for individuals and businesses." },
  { title: "GST Registration & Filing", description: "End-to-end GST registration, return filing, and advisory support." },
  { title: "Tax Audit", description: "Detailed statutory audit assistance with robust documentation and review." },
  { title: "Accounting & Bookkeeping", description: "Reliable bookkeeping, financial reporting, and monthly close support." },
  { title: "Payroll & TDS", description: "Payroll processing, salary compliance, and TDS management support." },
  { title: "Company Registration", description: "Private limited, LLP, partnership, and MSME registration support." },
];

export default function ServicesPage() {
  return (
    <PageShell title="Our Services" description="A complete range of professional tax, audit, compliance, and business registration services for modern enterprises.">
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-[24px] border border-[#d8c892] bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#0b3733]">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4a473d]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
