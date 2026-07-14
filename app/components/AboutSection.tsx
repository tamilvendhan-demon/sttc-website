export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">About Us</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built on expertise, integrity, and client-first service.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Sree Thirumurugan Tax Consultancy is a trusted name for financial compliance, advisory, and business support in India. We blend deep domain expertise with modern digital tools to deliver a premium client experience.
          </p>
        </div>
        <div className="rounded-[30px] bg-slate-900 p-8 text-white shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "10+", label: "Years of practice" },
              { value: "500+", label: "Clients served" },
              { value: "24/7", label: "Support" },
              { value: "98%", label: "Timely filings" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-3xl font-semibold">{item.value}</p>
                <p className="mt-2 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
