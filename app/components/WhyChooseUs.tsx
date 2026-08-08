const reasons = [
  {
    title: "Clear Tax Strategy",
    text: "Practical, proactive advice that helps clients reduce risk and improve compliance confidence.",
  },
  {
    title: "Responsive Support",
    text: "Fast communication and timely follow-up for urgent filings, queries, and compliance deadlines.",
  },
  {
    title: "Audit Ready Records",
    text: "Structured documentation and proper review routines to keep your financial records organized.",
  },
  {
    title: "Business-First Guidance",
    text: "Advice designed around actual business challenges, growth plans, and long-term sustainability.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Why Choose Us</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Strategic support built for trust, clarity, and growth.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="feature-card-3d panel-3d rounded-[24px] p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3733] text-lg font-bold text-[#f6f0de] shadow-[0_12px_20px_rgba(11,55,51,0.2)]">
                {reason.title.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-[#0b3733]">{reason.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a473d]">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
