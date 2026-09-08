"use client";
import { useState } from "react";
import Brand from "../components/Brand";
import ChatPanel from "./ChatPanel";

export default function ThedalDemo() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  async function runDemo() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/analyse-image');
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setAnalysis({ error: 'AI demo failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <header className="flex flex-col gap-5 border-b border-[#e6dcc1] pb-8 md:flex-row md:items-end md:justify-between"><div><Brand /><p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#c99a45]">The AI business assistant</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b3733]">See your product differently.</h1><p className="mt-3 max-w-2xl leading-7 text-[#706a5e]">A three-minute demonstration of how one simple craft input becomes a catalogue, a price insight, and a map of potential markets.</p></div><button onClick={runDemo} disabled={loading} className="rounded-full bg-[#155a50] px-6 py-3 text-sm font-semibold text-white">{loading ? "Understanding your craft…" : "Run complete AI demo →"}</button></header>
      <main className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-5"><div className="rounded-[26px] bg-[#0b3733] p-6 text-[#f6f0de] md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-[#e7c97c]">01 · Product understanding</p><h2 className="mt-3 text-2xl font-semibold">A handmade basket, understood.</h2></div><span className="text-4xl text-[#c99a45]">✦</span></div><div className="mt-7 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">{[["Material","Bamboo"],["Craft","Handwoven"],["Style","Eco-friendly"],["Confidence","92%"]].map(([label,value]) => <div key={label} className="rounded-xl bg-white/10 p-3"><p className="text-xs text-[#b8d0c0]">{label}</p><p className="mt-2 font-semibold">{value}</p></div>)}</div></div>{analysis ? <div className="space-y-5"><div className="rounded-2xl border border-[#e6dcc1] bg-white p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">02 · Smart catalogue</p><h2 className="mt-2 text-2xl font-semibold text-[#0b3733]">{analysis.catalogue?.title || analysis.productName}</h2></div><span className="rounded-full bg-[#e6f2e9] px-3 py-1 text-xs font-semibold text-[#155a50]">Editable result</span></div><p className="mt-4 leading-7 text-[#5f5a50]">{analysis.catalogue?.detailedDescription}</p><div className="mt-5 flex flex-wrap gap-2">{(analysis.tags || []).map((tag: string) => <span key={tag} className="rounded-full bg-[#fff1d5] px-3 py-1 text-xs font-semibold text-[#8a5b12]">#{tag}</span>)}</div></div><div className="grid gap-5 md:grid-cols-2"><div className="rounded-2xl bg-[#fffaf0] p-6 ring-1 ring-[#ead9ae]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">03 · AI price insight</p><p className="mt-4 text-3xl font-semibold text-[#0b3733]">₹{analysis.priceEstimate?.min || 700}–₹{analysis.priceEstimate?.max || 1100}</p><p className="mt-2 text-sm text-[#706a5e]">Recommended starting price ₹{analysis.priceEstimate?.recommended || 899}</p><p className="mt-4 text-xs text-[#8b8069]">AI-assisted estimate · verify with material, size, and effort.</p></div><div className="rounded-2xl border border-[#e6dcc1] bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">Photo quality</p><p className="mt-4 text-3xl font-semibold text-[#0b3733]">84<span className="text-base text-[#8b8069]">/100</span></p><p className="mt-2 text-sm text-[#706a5e]">Good clarity. Move closer and use a clean background for the next listing.</p></div></div><div className="rounded-2xl border border-[#e6dcc1] bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">04 · Market linkage</p><h2 className="mt-2 text-2xl font-semibold text-[#0b3733]">Where this product fits</h2><div className="mt-5 space-y-4">{(analysis.marketMatches || []).map((match: {segment:string;score:number;reason:string}) => <div key={match.segment}><div className="flex items-center justify-between gap-4"><span className="font-semibold text-[#0b3733]">{match.segment}</span><strong className="text-[#155a50]">{Math.round(match.score * 100)}%</strong></div><div className="mt-2 h-2 rounded-full bg-[#f0eadb]"><div className="h-2 rounded-full bg-[#c99a45]" style={{ width: `${match.score * 100}%` }} /></div><p className="mt-2 text-sm text-[#706a5e]">{match.reason}</p></div>)}</div></div></div> : <div className="rounded-2xl border border-dashed border-[#d8c892] p-10 text-center"><p className="text-lg font-semibold text-[#0b3733]">Ready for the judge demo</p><p className="mt-2 text-sm leading-6 text-[#706a5e]">Click “Run complete AI demo” to reveal the catalogue, price insight, and market matches.</p></div>}</section>
        <aside className="space-y-5"><div className="rounded-2xl border border-[#e6dcc1] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">Ask Thedal anything</p><p className="mt-2 text-sm leading-6 text-[#706a5e]">Try “Who should buy this?”, “How can I price it?”, or “What should I make next?”</p><div className="mt-5"><ChatPanel /></div></div><div className="rounded-2xl bg-[#e6f2e9] p-5 text-[#155a50]"><p className="font-semibold">Human-in-the-loop by design</p><p className="mt-2 text-sm leading-6">AI creates a strong first draft. The artisan reviews every field before publishing, and admin teams verify trust independently.</p></div></aside>
      </main>
    </div>
  );
}
