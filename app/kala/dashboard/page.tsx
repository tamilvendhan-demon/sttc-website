"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  title: string;
  category?: string;
  price?: number;
  status?: string;
  aiConfidence?: number;
  location?: string;
  tags?: string[];
};

type Artisan = { name: string; location?: string; craftSpecialization?: string; verificationStatus?: string };

const opportunities = [
  { label: "Eco-friendly home decor", signal: "High", detail: "Bamboo storage and lighting are underrepresented in the demo catalogue.", color: "bg-[#e6f2e9] text-[#155a50]" },
  { label: "Corporate gifting", signal: "Rising", detail: "Gift-ready products with wholesale pricing can reach new buyer groups.", color: "bg-[#fff1d5] text-[#8a5b12]" },
];

export default function ArtisanDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    fetch("/api/products/list").then((response) => response.json()).then((data) => {
      setProducts(data.products || []);
      setArtisans(data.artisans || []);
    });
  }, []);

  const published = useMemo(() => products.filter((product) => product.status === "Published"), [products]);
  const averageConfidence = useMemo(() => {
    if (!products.length) return 0;
    return Math.round((products.reduce((sum, product) => sum + (product.aiConfidence || 0), 0) / products.length) * 100);
  }, [products]);
  const currentArtisan = artisans[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-5 py-10 lg:px-8">
      <section className="relative overflow-hidden rounded-[28px] bg-[#0b3733] p-7 text-[#f6f0de] shadow-[0_24px_70px_rgba(11,55,51,0.18)] md:p-10">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[24px] border-[#c99a45]/30" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e7c97c]">Artisan workspace</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Good craft deserves to be discovered.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#dce9dc]">Turn a photo or a simple description into a market-ready catalogue, then let THEDAL help you find the buyers who are looking for it.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/kala/products/new" className="rounded-full bg-[#c99a45] px-5 py-3 text-sm font-semibold text-white">+ Create with AI</Link>
            <Link href="/kala/marketplace" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white">See buyer view</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Published products", published.length, "Ready for discovery"],
          ["Buyer views", "128", "Demo engagement"],
          ["Potential leads", "18", "AI market matches"],
          ["AI confidence", `${averageConfidence || 92}%`, "Average catalogue quality"],
        ].map(([label, value, detail]) => (
          <div key={label} className="panel-3d rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b8069]">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-[#0b3733]">{value}</p>
            <p className="mt-1 text-sm text-[#6d675c]">{detail}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c99a45]">Your catalogue</p><h2 className="mt-1 text-2xl font-semibold text-[#0b3733]">Recent products</h2></div>
            <Link href="/kala/products/new" className="text-sm font-semibold text-[#155a50]">Add product</Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 4).map((product) => (
              <Link href={`/kala/products/${product.id}`} key={product.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[#e6dcc1] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="min-w-0"><p className="truncate font-semibold text-[#0b3733]">{product.title}</p><p className="mt-1 text-sm text-[#706a5e]">{product.category || "Handmade craft"} · {product.location || "Tamil Nadu"}</p></div>
                <div className="shrink-0 text-right"><p className="font-semibold text-[#0b3733]">₹{product.price || "—"}</p><span className="text-xs text-[#155a50]">{product.status || "Draft"}</span></div>
              </Link>
            ))}
            {!products.length && <div className="rounded-2xl border border-dashed border-[#d8c892] p-8 text-center text-sm text-[#706a5e]">Your first AI-generated product will appear here.</div>}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-[#e6dcc1] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">Profile health</p>
            <div className="mt-4 flex items-center justify-between"><span className="font-semibold text-[#0b3733]">{currentArtisan?.name || "Demo artisan"}</span><span className="rounded-full bg-[#e6f2e9] px-2 py-1 text-xs text-[#155a50]">Verified</span></div>
            <p className="mt-2 text-sm leading-6 text-[#706a5e]">{currentArtisan?.craftSpecialization || "Traditional handmade craft"} · {currentArtisan?.location || "Tamil Nadu"}</p>
            <div className="mt-5 h-2 rounded-full bg-[#f0eadb]"><div className="h-2 w-[82%] rounded-full bg-[#c99a45]" /></div><p className="mt-2 text-xs text-[#706a5e]">82% complete · add your artisan story</p>
          </div>
          <div className="rounded-2xl bg-[#fffaf0] p-5 ring-1 ring-[#ead9ae]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5b12]">AI opportunities</p><div className="mt-4 space-y-4">{opportunities.map((opportunity) => <div key={opportunity.label}><div className="flex items-center justify-between gap-3"><p className="font-semibold text-[#0b3733]">{opportunity.label}</p><span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${opportunity.color}`}>{opportunity.signal}</span></div><p className="mt-1 text-sm leading-6 text-[#706a5e]">{opportunity.detail}</p></div>)}</div><Link href="/kala/thedal" className="mt-5 block text-sm font-semibold text-[#155a50]">Ask Thedal for advice →</Link></div>
        </aside>
      </div>
    </div>
  );
}
