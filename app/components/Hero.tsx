export default function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-5xl font-bold">
          Professional Tax & Audit Services
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          GST, Income Tax Filing, Company Registration,
          Audit, Bookkeeping and Financial Consultancy.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700">
            Get Started
          </button>

          <button className="rounded-lg border border-white px-6 py-3 hover:bg-white hover:text-black">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
} 