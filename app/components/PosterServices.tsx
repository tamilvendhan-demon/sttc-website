const items = [
  { title: "Income Tax Filing", blurb: "Personal and business return filing with planning support." },
  { title: "Income Tax Planning", blurb: "Strategic planning to reduce tax leakage and improve yearly compliance." },
  { title: "GST Registration & Compliance", blurb: "Registration, return filing, and reconciliation support." },
  { title: "GST Advisory", blurb: "Structured advisory for ongoing compliance and process improvement." },
  { title: "Tax Audit & Internal Audit", blurb: "Audit-ready books and statutory compliance assistance." },
  { title: "Book Keeping & Accounting", blurb: "Accurate monthly records, reporting, and financial clarity." },
  { title: "Payroll & TDS", blurb: "Employee payroll, challans, and deduction compliance." },
  { title: "Company Registration & MSME", blurb: "Startup incorporation and government registration guidance." },
  { title: "FSSAI & IEC", blurb: "Licensing and import-export support for growing businesses." },
  { title: "Project Report & Loan Consultancy", blurb: "Bank-ready project reports and funding support planning." },
  { title: "Business Advisory", blurb: "Operational planning and decision support for steady financial growth." },
  { title: "Financial Consultancy", blurb: "Practical finance guidance for better business and personal decisions." },
];

export default function PosterServices() {
  return (
    <section id="services" className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Our Services</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Comprehensive advisory for every growth stage
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="feature-card-3d panel-3d rounded-[24px] p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3733] text-lg font-bold text-[#f6f0de] shadow-[0_12px_22px_rgba(11,55,51,0.22)]">
                {item.title.charAt(0)}
              </div>
              <p className="text-lg font-semibold text-[#0b3733]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-[#4a473d]">{item.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
