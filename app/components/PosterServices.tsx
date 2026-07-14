const items = [
  "Income Tax Filing",
  "GST Registration & Return Filing",
  "Tax Audit & Internal Audit",
  "Book Keeping & Accounting",
  "Payroll & TDS",
  "Company Registration & MSME",
  "FSSAI & IEC",
  "Project Report & Loan Consultancy",
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
            <div key={item} className="rounded-[22px] border border-[#d8c892] bg-[#efe6cc] p-6 text-center shadow-sm">
              <p className="text-lg font-semibold text-[#0b3733]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
