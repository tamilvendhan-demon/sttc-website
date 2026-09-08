"use client";

import Link from "next/link";
import { useState } from "react";

export default function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("I am interested in this handmade product and would like to know more.");
  const [name, setName] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
      <Link href="/kala/marketplace" className="text-sm font-semibold text-[#155a50]">← Back to marketplace</Link>
      <div className="mt-6 rounded-[28px] bg-white p-7 shadow-xl ring-1 ring-[#e6dcc1] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c99a45]">Buyer inquiry</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#0b3733]">Start a conversation with the artisan.</h1>
        <p className="mt-3 leading-7 text-[#706a5e]">Your identity stays private until you choose to share it. For bulk orders, mention quantity and preferred delivery timeline.</p>
        {sent ? <div className="mt-8 rounded-2xl bg-[#e6f2e9] p-5 text-[#155a50]"><p className="font-semibold">Inquiry saved for the demo.</p><p className="mt-2 text-sm">The artisan will receive your interest through the THEDAL buyer workspace.</p><Link href="/kala/marketplace" className="mt-4 inline-block text-sm font-semibold underline">Continue exploring →</Link></div> : <form onSubmit={submit} className="mt-8 space-y-5"><label className="block"><span className="text-sm font-semibold text-[#0b3733]">Your name or organisation</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Green Home Store" className="mt-2 w-full rounded-xl border border-[#d8c892] p-3 outline-none focus:ring-2 focus:ring-[#c99a45]" /></label><label className="block"><span className="text-sm font-semibold text-[#0b3733]">What would you like to ask?</span><textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-[#d8c892] p-3 outline-none focus:ring-2 focus:ring-[#c99a45]" /></label><button type="submit" className="rounded-full bg-[#155a50] px-6 py-3 text-sm font-semibold text-white">Send private inquiry</button></form>}
      </div>
    </div>
  );
}
