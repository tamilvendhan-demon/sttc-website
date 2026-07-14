const serviceItems = [
  { title: "Income Tax Filing", description: "Personal and business ITR filing with expert review." },
  { title: "GST Services", description: "Registration, returns, and advisory for seamless compliance." },
  { title: "Tax Audit", description: "Detailed audit support and compliance reporting." },
  { title: "Accounting", description: "Bookkeeping, financial statements, and reporting." },
  { title: "Company Registration", description: "Private limited, LLP, and partnership setup." },
  { title: "Payroll & TDS", description: "Payroll processing, salary compliance, and TDS management." },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Comprehensive support for every compliance requirement
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            From registration to filing to strategic advisory, our team brings precision, speed, and clarity to your financial operations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
