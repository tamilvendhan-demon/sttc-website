export default function Services() {
  const items = [
    { title: 'Income Tax Filing', desc: 'ITR filing, notices, and tax planning for individuals and businesses.' },
    { title: 'GST Compliance', desc: 'GST registration, return filing, and reconciliation support.' },
    { title: 'Audit & Assurance', desc: 'Internal audits, statutory audits, and financial review services.' },
    { title: 'Company Formation', desc: 'Private limited, LLP, and partnership setup with complete guidance.' },
  ];

  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Services</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Trusted solutions for every stage of growth</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
