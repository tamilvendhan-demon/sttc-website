const items = [
  { title: "Income Tax Filing", blurb: "Personal and business return filing with planning support." },
  { title: "GST Registration & Compliance", blurb: "Registration, return filing, and reconciliation support." },
  { title: "Tax Audit & Internal Audit", blurb: "Audit-ready books and statutory compliance assistance." },
  { title: "Book Keeping & Accounting", blurb: "Accurate monthly records, reporting, and financial clarity." },
  { title: "Payroll & TDS", blurb: "Employee payroll, challans, and deduction compliance." },
  { title: "Company Registration & MSME", blurb: "Startup incorporation and government registration guidance." },
  { title: "FSSAI & IEC", blurb: "Licensing and import-export support for growing businesses." },
  { title: "Project Report & Loan Consultancy", blurb: "Bank-ready project reports and funding support planning." },
];

export default function PosterServices() {
  return (
    <section id="services" className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Our Services</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Comprehensive advisory for every growth stage
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-[22px] border border-[#d8c892] bg-[#efe6cc] p-6 shadow-sm">
              <p className="text-lg font-semibold text-[#0b3733]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-[#4a473d]">{item.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
