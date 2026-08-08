const industries = [
  "Retail & E-commerce",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Professional Services",
  "Startups & MSMEs",
  "Real Estate",
  "Hospitality",
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Industries</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Tailored tax and compliance support for every business model.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="feature-card-3d panel-3d rounded-[22px] p-5 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3733] text-sm font-bold text-[#f6f0de] shadow-[0_12px_20px_rgba(11,55,51,0.2)]">
                {industry.slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-4 text-base font-semibold text-[#0b3733]">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
