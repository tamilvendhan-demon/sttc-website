"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        preferredSlot: "",
        source: "contact",
      }),
    });

    if (response.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", notes: "" });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">
              Let’s discuss your compliance goals.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4a473d]">
              Reach our team for consultation, document review, audits, GST support, or business advisory.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[#d8c892] bg-[#f6f0de] p-4">
                <Mail className="h-5 w-5 text-[#155a50]" />
                <span>support@auditproindia.com</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#d8c892] bg-[#f6f0de] p-4">
                <Phone className="h-5 w-5 text-[#155a50]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#d8c892] bg-[#f6f0de] p-4">
                <MapPin className="h-5 w-5 text-[#155a50]" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8c892] bg-[#fbf8f2] p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Your Name" required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                <input className="rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Your Email" type="email" required value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
              </div>
              <input className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Phone Number" required value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
              <select className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" required value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}>
                <option value="">Select Service</option>
                <option>Income Tax Filing</option>
                <option>GST</option>
                <option>Audit</option>
                <option>Company Registration</option>
              </select>
              <textarea className="min-h-[120px] w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Tell us about your requirement" required value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
              <button className="inline-flex items-center gap-2 rounded-full bg-[#0b3733] px-5 py-3 text-sm font-semibold text-[#f6f0de] disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>
                {loading ? "Sending..." : <>Send Request <Send className="h-4 w-4" /></>}
              </button>
              {submitted ? <p className="text-sm font-semibold text-[#155a50]">Thank you! Your request has been received and will be reviewed shortly.</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
