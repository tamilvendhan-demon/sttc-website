export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">AuditPro India</h3>
          <p className="mt-2 text-sm">Professional tax, audit, and compliance services for modern businesses.</p>
        </div>
        <div className="text-sm">
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@auditproindia.com</p>
        </div>
      </div>
    </footer>
  );
}
