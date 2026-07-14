const faqs = [
  {
    question: "Do you support both individuals and businesses?",
    answer: "Yes, we provide tailored services for salaried individuals, startups, SMEs, and established companies.",
  },
  {
    question: "Can I book a consultation online?",
    answer: "Yes. You can submit your details through the consultation form and our team will follow up promptly.",
  },
  {
    question: "Do you provide filing support for GST and income tax?",
    answer: "Absolutely. We support GST registration, return filing, income tax filing, audits, and more.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[22px] border border-[#d8c892] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0b3733]">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-[#4a473d]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
