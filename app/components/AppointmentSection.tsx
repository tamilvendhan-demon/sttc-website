"use client";

import { useState } from "react";
import { CalendarDays, Clock3, CheckCircle2 } from "lucide-react";

const slots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

export default function AppointmentSection() {
  const [selectedSlot, setSelectedSlot] = useState<string>(slots[0]);
  const [service, setService] = useState("Income Tax Filing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      setStatus("Please fill your name, email, and phone number.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        notes,
        preferredSlot: selectedSlot,
        source: "appointment",
      }),
    });

    const result = await response.json();
    if (response.ok) {
      setStatus("Consultation request saved. Our team will follow up shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } else {
      setStatus(result.error || "We could not save your request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#f6f0de] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#d8c892] bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Appointment Booking</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0b3733] sm:text-4xl">
                Schedule a consultation with our experts.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4a473d]">
                Book a meeting for tax filing, GST compliance, audit support, or company registration guidance.
              </p>
              <div className="mt-8 rounded-[24px] border border-[#d8c892] bg-[#f6f0de] p-6">
                <div className="flex items-center gap-3 text-[#0b3733]">
                  <CalendarDays className="h-5 w-5" />
                  <p className="font-semibold">Flexible consultation slots available</p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-[#4a473d]">
                  <Clock3 className="h-4 w-4" />
                  <span>Response within 24 working hours</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#d8c892] bg-[#fbf8f2] p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${selectedSlot === slot ? "border-[#0b3733] bg-[#0b3733] text-[#f6f0de]" : "border-[#d8c892] bg-white text-[#0b3733]"}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Your name</label>
                  <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Your full name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="you@example.com" type="email" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Phone</label>
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Preferred service</label>
                  <select value={service} onChange={(event) => setService(event.target.value)} className="w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none">
                    <option>Income Tax Filing</option>
                    <option>GST</option>
                    <option>Audit</option>
                    <option>Company Registration</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0b3733]">Brief requirement</label>
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[100px] w-full rounded-2xl border border-[#d8c892] bg-white px-4 py-3 outline-none" placeholder="Tell us what you need help with" />
                </div>
              </div>
              <button className="mt-6 rounded-full bg-[#c99a45] px-5 py-3 text-sm font-semibold text-[#0b3733] disabled:cursor-not-allowed disabled:opacity-70" onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Confirm Appointment"}
              </button>
              {status ? (
                <div className={`mt-4 flex items-center gap-2 rounded-2xl border p-4 text-sm ${status.includes("saved") || status.includes("follow") ? "border-green-200 bg-green-50 text-green-800" : "border-[#d8c892] bg-[#f6f0de] text-[#0b3733]"}`}>
                  <CheckCircle2 className="h-5 w-5" />
                  {status}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
