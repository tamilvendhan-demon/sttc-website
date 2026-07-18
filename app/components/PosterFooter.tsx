import Link from "next/link";

export default function PosterFooter() {
  return (
    <footer id="contact" className="border-t border-[#d8c892] bg-[#0b3733] py-16 text-[#f6f0de]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#e7c97c]">Contact Us</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Sree Thirumurugan Tax Consultancy</h2>
            <p className="mt-3 text-sm leading-7 text-[#dfe8e4]">
              Reach out for consultation, filing support, audit assistance, or business advisory services with prompt, professional follow-up.
            </p>
          </div>
          <div className="text-sm leading-7 text-[#dfe8e4]">
            <p>📧 support@auditproindia.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Chennai, Tamil Nadu</p>
            <Link href="/admin" className="mt-3 inline-flex rounded-full border border-[#d8c892]/60 px-4 py-2 text-[#f6f0de] transition hover:bg-white/10">
              Open admin dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
