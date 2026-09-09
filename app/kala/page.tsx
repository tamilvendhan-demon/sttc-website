"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Image as ImageIcon,
  Menu,
  Mic,
  Search,
  Sparkles,
  Store,
  Upload,
  X,
} from "lucide-react";

const markets = [
  { name: "Home décor stores", score: 96, reason: "Natural bamboo + handcrafted finish fit décor buyers." },
  { name: "Eco-friendly retailers", score: 92, reason: "Sustainable material and reusable design are strong signals." },
  { name: "Corporate gifting", score: 86, reason: "Customisable handmade products work well for bulk gifting." },
  { name: "Interior designers", score: 81, reason: "Useful as an accent piece for natural-material interiors." },
];

const catalogue = {
  productName: "Handwoven Bamboo Basket",
  category: "Home Décor",
  material: "Natural Bamboo",
  craft: "Traditional Handweaving",
  description:
    "A handcrafted bamboo basket made using traditional handweaving techniques. Its natural texture and warm finish make it a versatile choice for storage, gifting and sustainable home décor.",
  tags: ["bamboo", "handmade", "eco-friendly", "home décor", "traditional craft"],
  price: "₹899",
};

export default function KalaLanding() {
  const [view, setView] = useState<"home" | "artisan" | "market" | "admin">("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [showThedal, setShowThedal] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Vanakkam! I’m Thedal. Upload a product photo or ask me anything about your craft, catalogue, pricing or markets." },
  ]);
  const [generated, setGenerated] = useState(false);

  const quickQuestions = useMemo(
    () => ["Who should buy this product?", "How should I price it?", "Create a product description"],
    []
  );

  function askThedal(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    window.setTimeout(() => {
      let answer = "I can help with that. For this basket, I would start with home décor, eco-friendly retail and corporate gifting buyers.";
      if (/price|pricing|cost/i.test(q)) answer = "AI-assisted estimate: ₹700–₹1,100. A practical starting price is ₹899, then adjust for size, material cost, labour and finishing.";
      if (/description|catalog/i.test(q)) answer = catalogue.description;
      if (/buyer|market|sell/i.test(q)) answer = "Best market fit: Home décor stores (96%), Eco-friendly retailers (92%), Corporate gifting (86%), and Interior designers (81%).";
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    }, 450);
  }

  return (
    <main className="min-h-screen bg-[#fbf6ec] text-[#2b2118]">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .the-shadow { box-shadow: 0 16px 50px rgba(43,33,24,.09); }
        .lift { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .lift:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(43,33,24,.12); }
        .grain { background-image: radial-gradient(rgba(43,33,24,.045) .7px, transparent .7px); background-size: 7px 7px; }
      `}</style>

      <nav className="sticky top-0 z-40 border-b border-[#e4d9c4]/80 bg-[#fbf6ec]/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => setView("home")} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1c363d] text-[#d9a441]"><Sparkles size={20} /></span>
            <span><b className="block font-serif text-lg tracking-tight">KALA LINK <span className="text-[#a63d40]">AI</span></b><small className="hidden text-[10px] font-semibold uppercase tracking-[.2em] text-[#806f5d] sm:block">From craft to market</small></span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {[['home','Home'],['market','Marketplace'],['artisan','Artisan Dashboard'],['admin','Admin']].map(([id,label]) => (
              <button key={id} onClick={() => setView(id as typeof view)} className={`rounded-full px-4 py-2 text-sm font-semibold ${view===id ? 'bg-[#1c363d] text-white' : 'text-[#6b5d4f] hover:bg-[#f3ecdd]'}`}>{label}</button>
            ))}
          </div>

          <button onClick={() => setShowThedal(true)} className="hidden items-center gap-2 rounded-full bg-[#a63d40] px-4 py-2.5 text-sm font-semibold text-white shadow-sm md:flex"><Bot size={17}/> Ask Thedal</button>
          <button className="rounded-xl border border-[#e4d9c4] p-2 md:hidden" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
        {mobileNav && <div className="border-t border-[#e4d9c4] px-5 py-3 md:hidden"><div className="grid gap-1">{[['home','Home'],['market','Marketplace'],['artisan','Artisan Dashboard'],['admin','Admin']].map(([id,label]) => <button key={id} onClick={() => {setView(id as typeof view);setMobileNav(false)}} className="rounded-lg px-3 py-3 text-left text-sm font-semibold">{label}</button>)}<button onClick={() => {setShowThedal(true);setMobileNav(false)}} className="rounded-lg bg-[#a63d40] px-3 py-3 text-left text-sm font-semibold text-white">Ask Thedal</button></div></div>}
      </nav>

      {view === "home" && <>
        <section className="grain overflow-hidden border-b border-[#e4d9c4]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#d9a441]/40 bg-[#fffaf0] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#8a681f]"><span className="h-1.5 w-1.5 rounded-full bg-[#d9a441]"/> AI-DRIVEN MARKET LINKAGE · SIH26090 · MoSJE</div>
              <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[.98] tracking-tight text-[#1c363d] md:text-7xl">Turn your craft<br/>into <span className="text-[#a63d40]">opportunity.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6b5d4f]">An AI-powered digital business assistant for marginalized artisans — catalogue handmade work, understand products, discover the right markets and reach better buyers.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setView("artisan")} className="inline-flex items-center gap-2 rounded-full bg-[#1c363d] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#294952]">Start as an Artisan <ArrowRight size={17}/></button><button onClick={() => setView("market")} className="rounded-full border border-[#bcae92] bg-white/60 px-6 py-3.5 text-sm font-bold text-[#1c363d]">Explore Products</button></div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-5 border-t border-[#e4d9c4] pt-6">{[['AI','Product understanding'],['4','Catalogue intelligence layers'],['3','Languages: EN · TA · HI']].map(([n,t]) => <div key={t}><b className="font-serif text-2xl text-[#a63d40]">{n}</b><p className="mt-1 text-xs leading-5 text-[#806f5d]">{t}</p></div>)}</div>
            </div>

            <div className="relative flex items-center">
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-[22px] border-[#d9a441]/15"/>
              <div className="the-shadow relative w-full rounded-[30px] bg-[#1c363d] p-5 text-[#fbf6ec] md:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d9a441]">Thedal intelligence</p><p className="mt-1 font-serif text-xl">One product. Many possibilities.</p></div><span className="rounded-full bg-[#d9a441] px-3 py-1 text-[10px] font-bold text-[#2b2118]">AI READY</span></div>
                <div className="mt-6 rounded-2xl bg-[#fbf6ec] p-4 text-[#2b2118]"><div className="flex items-center gap-4"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#eadfc9] text-4xl text-[#a63d40]"><Store size={38}/></div><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8a681f]">AI identified</p><h2 className="mt-1 font-serif text-xl">Handwoven bamboo basket</h2><p className="mt-1 text-xs text-[#806f5d]">Home décor · Bamboo · 92% confidence</p></div></div><div className="mt-5 grid grid-cols-3 gap-2 text-center">{[['₹899','price insight'],['94%','market fit'],['18','buyer leads']].map(([v,l]) => <div key={l} className="rounded-xl bg-white p-3"><b className="block font-serif text-lg text-[#1c363d]">{v}</b><span className="text-[10px] text-[#806f5d]">{l}</span></div>)}</div></div>
                <div className="mt-6 grid grid-cols-4 gap-2 text-center text-[10px] text-[#d9e4df]">{[['01','Photo'],['02','Catalogue'],['03','Market'],['04','Buyer']].map(([n,t]) => <div key={n}><span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold text-[#d9a441]">{n}</span><p className="mt-2">{t}</p></div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf0] py-16"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-3 lg:px-8"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a63d40]">The gap</p><h2 className="mt-3 font-serif text-3xl font-semibold text-[#1c363d]">Good products remain invisible.</h2></div><p className="leading-8 text-[#6b5d4f]">An artisan may know exactly how to make a beautiful product, but not how to photograph it, describe it, price it, or find the right store.</p><p className="leading-8 text-[#6b5d4f]">Thedal changes that by acting as a digital business assistant before discovery begins — not just another generic marketplace.</p></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a63d40]">One guided journey</p><h2 className="mt-3 font-serif text-3xl font-semibold text-[#1c363d] md:text-4xl">From craft to market in four steps.</h2></div><button onClick={() => setView("artisan")} className="inline-flex items-center gap-1 text-sm font-bold text-[#1c363d]">Open artisan dashboard <ChevronRight size={17}/></button></div><div className="mt-9 grid gap-4 md:grid-cols-4">{[['01','Upload your craft','Photo, voice, or a simple description.'],['02','AI builds the catalogue','Titles, tags, story, price and confidence.'],['03','Discover markets','Buyer segments and recommended actions.'],['04','Connect with buyers','Publish, search and receive interest.']].map(([n,t,d]) => <div key={n} className="lift rounded-2xl border border-[#e4d9c4] bg-white p-6"><span className="text-sm font-bold text-[#d9a441]">{n}</span><h3 className="mt-8 font-serif text-xl font-semibold text-[#1c363d]">{t}</h3><p className="mt-3 text-sm leading-6 text-[#806f5d]">{d}</p></div>)}</div></section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="rounded-[30px] bg-[#1c363d] p-8 text-[#fbf6ec] md:p-12"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#d9a441]">Built for trust</p><h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">AI assists. Artisans decide. People verify.</h2></div><div className="grid gap-5 sm:grid-cols-3"><div><p className="font-bold">Editable by design</p><p className="mt-2 text-sm leading-6 text-[#d9e4df]">Every generated field can be reviewed before publishing.</p></div><div><p className="font-bold">Human verification</p><p className="mt-2 text-sm leading-6 text-[#d9e4df]">AI is never treated as proof of authenticity.</p></div><div><p className="font-bold">Privacy first</p><p className="mt-2 text-sm leading-6 text-[#d9e4df]">Only the information needed for discovery is exposed.</p></div></div></div></div></section>

        <section className="mx-auto max-w-7xl px-5 pb-20 text-center lg:px-8"><h2 className="font-serif text-3xl font-semibold text-[#1c363d]">Meet Thedal — your AI business assistant.</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-[#806f5d]">Ask questions naturally, analyse a product, create a catalogue, get pricing guidance or discover buyer segments from one interface.</p><button onClick={() => setShowThedal(true)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#a63d40] px-7 py-3.5 text-sm font-bold text-white">Open Thedal <Bot size={17}/></button></section>
      </>}

      {view === "artisan" && <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a63d40]">ARTISAN WORKSPACE</p><h1 className="mt-2 font-serif text-4xl font-semibold text-[#1c363d]">Turn one photo into a market-ready listing.</h1><p className="mt-3 max-w-2xl leading-7 text-[#6b5d4f]">Thedal creates the first draft. You review every field before it reaches buyers.</p></div><button onClick={() => setShowThedal(true)} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1c363d] px-5 py-3 text-sm font-bold text-white"><Bot size={17}/> Ask Thedal</button></div><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-5"><div className="rounded-2xl border border-[#e4d9c4] bg-white p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#f3ecdd] p-3"><Upload size={20}/></div><div><h2 className="font-serif text-xl font-semibold text-[#1c363d]">Product input</h2><p className="text-sm text-[#806f5d]">Photo, voice or simple description</p></div></div><div className="mt-5 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d9caa9] bg-[#fffaf0] text-center"><ImageIcon size={34} className="text-[#a63d40]"/><p className="mt-3 font-semibold">Drop a product photo here</p><p className="mt-1 text-xs text-[#806f5d]">Demo uses a sample handwoven bamboo basket</p><button onClick={() => setGenerated(true)} className="mt-4 rounded-full bg-[#1c363d] px-5 py-2.5 text-xs font-bold text-white">Analyse sample product</button></div></div><div className="rounded-2xl bg-[#e8f0eb] p-5 text-[#1c363d]"><p className="font-bold">Human-in-the-loop</p><p className="mt-2 text-sm leading-6">AI suggestions are editable. Low-confidence fields should be verified by the artisan before publishing.</p></div></div><div className="rounded-2xl border border-[#e4d9c4] bg-white p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a63d40]">AI SMART CATALOGUE</p><h2 className="mt-2 font-serif text-2xl font-semibold text-[#1c363d]">{generated ? catalogue.productName : 'Ready for your product'}</h2></div>{generated && <span className="rounded-full bg-[#e8f0eb] px-3 py-1 text-xs font-bold text-[#1c6a53]">Editable result</span>}</div>{generated ? <><div className="mt-6 grid gap-3 sm:grid-cols-2">{[['Category',catalogue.category],['Material',catalogue.material],['Craft type',catalogue.craft],['AI confidence','92%']].map(([a,b]) => <div key={a} className="rounded-xl bg-[#fffaf0] p-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#806f5d]">{a}</p><p className="mt-2 font-semibold text-[#1c363d]">{b}</p></div>)}</div><div className="mt-5 rounded-xl border border-[#e4d9c4] p-4"><p className="text-sm leading-7 text-[#6b5d4f]">{catalogue.description}</p><div className="mt-4 flex flex-wrap gap-2">{catalogue.tags.map(t => <span key={t} className="rounded-full bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#806f5d]">#{t}</span>)}</div></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-[#1c363d] p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d9a441]">AI price insight</p><p className="mt-2 font-serif text-3xl">{catalogue.price}</p><p className="mt-1 text-xs text-[#d9e4df]">Suggested starting price · estimate only</p></div><div className="rounded-xl bg-[#fffaf0] p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a63d40]">Photo quality</p><p className="mt-2 font-serif text-3xl text-[#1c363d]">84<span className="text-base text-[#806f5d]">/100</span></p><p className="mt-1 text-xs text-[#806f5d]">Good clarity. Cleaner background recommended.</p></div></div></> : <div className="flex min-h-96 items-center justify-center rounded-2xl border-2 border-dashed border-[#e4d9c4] text-center"><div><Sparkles className="mx-auto text-[#d9a441]" size={30}/><p className="mt-3 font-serif text-xl font-semibold text-[#1c363d]">Your AI catalogue will appear here</p><p className="mt-2 text-sm text-[#806f5d]">Analyse the sample product to see the full flow.</p></div></div>}</div></div></section>}

      {view === "market" && <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a63d40]">MARKETPLACE</p><h1 className="mt-2 font-serif text-4xl font-semibold text-[#1c363d]">Discover where handmade products fit.</h1><p className="mt-3 max-w-2xl leading-7 text-[#6b5d4f]">Search by product, buyer intent or market segment. This demo uses explainable market-fit scores.</p></div><div className="flex items-center gap-2 rounded-full border border-[#e4d9c4] bg-white px-4 py-2.5"><Search size={17}/><input className="w-40 bg-transparent text-sm outline-none" placeholder="Search products..."/></div></div><div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]"><div className="rounded-2xl border border-[#e4d9c4] bg-white p-6"><div className="flex gap-4"><div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#eadfc9] text-[#a63d40]"><Store size={42}/></div><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a63d40]">Featured artisan product</p><h2 className="mt-1 font-serif text-2xl font-semibold text-[#1c363d]">{catalogue.productName}</h2><p className="mt-1 text-sm text-[#806f5d]">{catalogue.material} · {catalogue.craft}</p></div></div><div className="mt-6 grid grid-cols-3 gap-3">{[['₹899','AI price'],['92%','confidence'],['18','buyer leads']].map(([v,l]) => <div key={l} className="rounded-xl bg-[#fffaf0] p-4 text-center"><b className="font-serif text-xl text-[#1c363d]">{v}</b><p className="mt-1 text-[10px] text-[#806f5d]">{l}</p></div>)}</div></div><div className="rounded-2xl bg-[#1c363d] p-6 text-white"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d9a441]">AI market linkage</p><h2 className="mt-2 font-serif text-2xl">Where this product fits</h2><div className="mt-6 space-y-5">{markets.map(m => <div key={m.name}><div className="flex items-center justify-between gap-4"><span className="text-sm font-semibold">{m.name}</span><b className="text-[#d9a441]">{m.score}%</b></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#d9a441]" style={{width:`${m.score}%`}}/></div><p className="mt-2 text-xs leading-5 text-[#d9e4df]">{m.reason}</p></div>)}</div></div></div></section>}

      {view === "admin" && <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a63d40]">ADMIN CONSOLE</p><h1 className="mt-2 font-serif text-4xl font-semibold text-[#1c363d]">Trust, verification and platform oversight.</h1><div className="mt-8 grid gap-4 md:grid-cols-4">{[['24','Artisans'],['87','Products'],['12','Pending review'],['94%','Verified']].map(([n,l]) => <div key={l} className="rounded-2xl border border-[#e4d9c4] bg-white p-5"><p className="font-serif text-3xl text-[#1c363d]">{n}</p><p className="mt-2 text-xs text-[#806f5d]">{l}</p></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-[#e4d9c4] bg-white p-6"><h2 className="font-serif text-xl font-semibold text-[#1c363d]">Verification queue</h2><div className="mt-5 space-y-3">{['Lakshmi Handcrafts','Marudham Bamboo Works','Kaveri Palm Studio'].map((x,i) => <div key={x} className="flex items-center justify-between rounded-xl bg-[#fffaf0] p-4"><div><p className="font-semibold text-[#1c363d]">{x}</p><p className="text-xs text-[#806f5d]">{i+1} product awaiting review</p></div><button className="rounded-full border border-[#bcae92] px-3 py-1.5 text-xs font-bold">Review</button></div>)}</div></div><div className="rounded-2xl bg-[#e8f0eb] p-6"><div className="flex items-center gap-2 font-semibold text-[#1c363d]"><Check size={18}/> Human verification policy</div><p className="mt-3 text-sm leading-7 text-[#52665e]">AI can flag anomalies and organise information, but admin verification remains the final trust decision. This keeps the marketplace explainable and safer.</p></div></div></section>}

      {showThedal && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#2b2118]/45 p-0 md:items-center md:p-5" onClick={(e) => { if (e.target === e.currentTarget) setShowThedal(false); }}><div className="flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[26px] bg-[#fbf6ec] the-shadow md:h-[720px] md:rounded-[26px]"><div className="flex items-center justify-between border-b border-[#e4d9c4] px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1c363d] text-[#d9a441]"><Bot size={20}/></span><div><b className="block font-serif text-lg text-[#1c363d]">Thedal</b><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#806f5d]">AI business assistant · Demo mode</span></div></div><button onClick={() => setShowThedal(false)} className="rounded-full p-2 hover:bg-[#f3ecdd]"><X size={20}/></button></div><div className="flex-1 overflow-y-auto p-5"><div className="mx-auto max-w-2xl space-y-4">{messages.map((m,i) => <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.role==='user' ? 'bg-[#1c363d] text-white' : 'border border-[#e4d9c4] bg-white text-[#2b2118]'}`}>{m.text}</div></div>)}<div className="pt-3"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#806f5d]">Try asking</p><div className="flex flex-wrap gap-2">{quickQuestions.map(q => <button key={q} onClick={() => askThedal(q)} className="rounded-full border border-[#d9caa9] bg-white px-3 py-2 text-xs font-semibold">{q}</button>)}</div></div></div></div><div className="border-t border-[#e4d9c4] bg-white/60 p-4"><div className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-[#d9caa9] bg-white p-2"><button className="rounded-xl p-2 text-[#806f5d] hover:bg-[#f3ecdd]" title="Upload"><ImageIcon size={19}/></button><input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter')askThedal(input)}} placeholder="Message Thedal..." className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none"/><button className="rounded-xl p-2 text-[#806f5d] hover:bg-[#f3ecdd]" title="Voice"><Mic size={19}/></button><button onClick={()=>askThedal(input)} className="rounded-xl bg-[#a63d40] p-2.5 text-white"><ArrowRight size={18}/></button></div><p className="mx-auto mt-2 max-w-2xl text-center text-[10px] text-[#927f6b]">Demo responses are illustrative. Production AI should run through a secure server-side API.</p></div></div></div>}
    </main>
  );
}
