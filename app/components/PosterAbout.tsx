export default function PosterAbout() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">About</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Experienced advisory with a calm, dependable approach.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4a473d]">
            We bring years of practical experience in taxation, compliance, and financial operations to help clients stay compliant, reduce stress, and make informed decisions without delays.
          </p>
          <div className="mt-8 space-y-4 text-[#4a473d]">
            <div className="rounded-[20px] border border-[#d8c892] bg-[#f6f0de] p-4">
              <p className="font-semibold text-[#0b3733]">Our mission</p>
              <p className="mt-2 text-sm leading-7">Simplify compliance and give clients clarity, confidence, and actionable advice.</p>
            </div>
            <div className="rounded-[20px] border border-[#d8c892] bg-[#f6f0de] p-4">
              <p className="font-semibold text-[#0b3733]">Our values</p>
              <p className="mt-2 text-sm leading-7">Professionalism, accuracy, responsiveness, and long-term client-first guidance.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-[#d8c892] bg-[#f6f0de] p-8 shadow-[0_18px_45px_rgba(11,55,51,0.04)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "10+", label: "Years of practice" },
              { value: "500+", label: "Clients served" },
              { value: "24/7", label: "Client support" },
              { value: "98%", label: "Timely filing" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#d8c892] bg-white/80 p-4">
                <p className="text-2xl font-semibold text-[#0b3733]">{item.value}</p>
                <p className="mt-2 text-sm text-[#4a473d]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
