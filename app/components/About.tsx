export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">About Us</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Professional guidance with a personal touch</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            AuditPro India helps individuals and businesses stay compliant, reduce tax stress, and make better financial decisions with dependable advisory support.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">10+</p>
              <p className="mt-2 text-sm text-slate-300">Years of Experience</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">500+</p>
              <p className="mt-2 text-sm text-slate-300">Happy Clients</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">98%</p>
              <p className="mt-2 text-sm text-slate-300">On-time Filing</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-2 text-sm text-slate-300">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
