const testimonials = [
  {
    quote: "The team made our filing process effortless and incredibly professional.",
    name: "Mr. Karthik R.",
    role: "SME Owner",
  },
  {
    quote: "Clear guidance, quick communication, and excellent compliance support.",
    name: "Mrs. Asha M.",
    role: "Startup Founder",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Testimonials</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Trusted by professionals and growing businesses
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.name} className="feature-card-3d panel-3d rounded-[24px] p-8">
              <div className="mb-4 flex gap-1 text-[#c99a45]">
                {Array.from({ length: 5 }).map((_, v) => (
                  <span key={v}>★</span>
                ))}
              </div>
              <p className="text-lg leading-8 text-[#4a473d]">“{item.quote}”</p>
              <div className="mt-6 border-t border-[#d8c892] pt-4">
                <p className="font-semibold text-[#0b3733]">{item.name}</p>
                <p className="text-sm text-[#155a50]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
