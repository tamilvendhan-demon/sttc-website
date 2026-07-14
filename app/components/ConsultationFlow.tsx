"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Download, ShieldCheck } from "lucide-react";

const serviceOptions = [
  "Income Tax Filing",
  "GST Registration",
  "Tax Audit",
  "Accounting & Book Keeping",
  "Payroll & TDS",
  "Company Registration",
];

export default function ConsultationFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: serviceOptions[0],
    notes: "",
  });
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generatedSummary = useMemo(() => {
    return `Consultation Request\nName: ${form.name || "Not provided"}\nPhone: ${form.phone || "Not provided"}\nEmail: ${form.email || "Not provided"}\nService: ${form.service}\nNotes: ${form.notes || "No notes"}`;
  }, [form]);

  const handleDownload = () => {
    const blob = new Blob([generatedSummary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `consultation-${form.name || "client"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOtpVerify = () => {
    if (otp === "123456") {
      setVerified(true);
      setStep(3);
    } else {
      alert("OTP mismatch. For demo, use 123456.");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(3);
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Consultation Flow</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">
              Share your details and receive a secure consultation request.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4a473d]">
              This experience simulates a real consultancy workflow with form capture, OTP verification, and downloadable summary output.
            </p>
            <div className="mt-8 rounded-[24px] border border-[#d8c892] bg-[#f6f0de] p-6">
              <div className="flex items-center gap-3 text-[#0b3733]">
                <ShieldCheck className="h-5 w-5 text-[#155a50]" />
                <p className="font-semibold">Secure and privacy-conscious form handling</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[#4a473d]">
                <li>• Client details are captured in a structured form.</li>
                <li>• OTP verification is simulated for secure validation.</li>
                <li>• A downloadable summary is generated instantly.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8c892] bg-[#fbf8f2] p-8 shadow-[0_20px_55px_rgba(11,55,51,0.08)]">
            <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-[#155a50]">
              <div className="rounded-full bg-[#0b3733] px-3 py-1 text-[#f6f0de]">Step {step}</div>
              <span>{step === 1 ? "Client Details" : step === 2 ? "OTP Verification" : "Request Ready"}</span>
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Full Name</label>
                  <input className="w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Enter your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Phone</label>
                    <input className="w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Email</label>
                    <input className="w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Service Needed</label>
                  <select className="w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Notes</label>
                  <textarea className="min-h-[110px] w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Briefly describe your requirement" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de]" onClick={() => setStep(2)}>
                  Continue to OTP Verification <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#d8c892] bg-white p-4 text-sm text-[#4a473d]">
                  A one-time password has been sent to your phone and email. For demo, use <span className="font-semibold text-[#0b3733]">123456</span>.
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Enter OTP</label>
                  <input className="w-full rounded-xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de]" onClick={handleOtpVerify}>
                  Verify OTP <ShieldCheck className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    Consultation request submitted successfully.
                  </div>
                  <p className="mt-2">Your request is ready for the consultant team to review.</p>
                </div>

                <div className="rounded-2xl border border-[#d8c892] bg-white p-4">
                  <p className="text-sm font-semibold text-[#0b3733]">Captured details</p>
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-[#4a473d]">{generatedSummary}</pre>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de]" onClick={handleDownload}>
                    Download Summary <Download className="h-4 w-4" />
                  </button>
                  <button className="rounded-full border border-[#d8c892] px-5 py-3 text-sm font-semibold text-[#0b3733]" onClick={() => { setStep(1); setOtp(""); setVerified(false); setSubmitted(false); }}>
                    Start Over
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
