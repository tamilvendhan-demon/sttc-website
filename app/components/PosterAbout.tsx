export default function PosterAbout() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">About</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">
            Precision-led advisory with elegant execution.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4a473d]">
            Sree Thirumurugan Tax Consultancy combines deep regulatory expertise with a modern, premium client experience. Our approach is rooted in accuracy, speed, and long-term business support.
          </p>
        </div>
        <div className="rounded-[28px] border border-[#d8c892] bg-[#f6f0de] p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "10+", label: "Years of practice" },
              { value: "500+", label: "Clients Served" },
              { value: "24/7", label: "Client Support" },
              { value: "98%", label: "Timely Filing" },
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
