import PageShell from "../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell title="About AuditPro India" description="We blend expertise, trust, and digital convenience to deliver premium compliance and advisory services.">
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-[24px] border border-[#d8c892] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0b3733]">Our philosophy</h2>
            <p className="mt-4 text-lg leading-8 text-[#4a473d]">
              Sree Thirumurugan Tax Consultancy is built around precision, integrity, and timely execution. We help clients make confident financial decisions with modern advisory and support.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#d8c892] bg-[#f6f0de] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0b3733]">Why clients choose us</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4a473d]">
              <li>• Experienced professionals with deep domain expertise</li>
              <li>• Transparent and proactive communication</li>
              <li>• Secure digital workflows and client portal support</li>
              <li>• Premium support for audits, tax, and compliance needs</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
