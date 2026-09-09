"use client";

import { useState } from "react";
import { Bot, FileText, Image as ImageIcon, Menu, Mic, Plus, Search, Send, Sparkles, Store, X } from "lucide-react";

const suggestions = [
  ["Create a catalogue", "Turn my product photo into a professional listing"],
  ["Find markets", "Which buyers are most suitable for my craft?"],
  ["Price my product", "Give me an AI-assisted pricing range"],
  ["Improve my photo", "Check whether my product photo is market-ready"],
];

const products = [
  { emoji: "🧺", name: "Handwoven Bamboo Basket", meta: "Home Décor · ₹899", score: 96 },
  { emoji: "🏺", name: "Terracotta Heritage Pot", meta: "Pottery · ₹650", score: 91 },
  { emoji: "🧵", name: "Handloom Cotton Stole", meta: "Textile · ₹1,250", score: 88 },
];

export default function ThedalPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role:"user"|"assistant";text:string}[]>([]);
  const [mobile, setMobile] = useState(false);
  const [mode, setMode] = useState("chat");

  function send(text = query) {
    const q = text.trim();
    if (!q) return;
    setMessages(m => [...m, { role:"user", text:q }, { role:"assistant", text: answer(q) }]);
    setQuery("");
    setOpen(true);
  }

  function answer(q:string) {
    const s=q.toLowerCase();
    if (s.includes("price")) return "For a handmade bamboo basket, an AI-assisted starting range could be ₹700–₹1,100. A practical demo price is ₹899. Final pricing should consider material, labour, size, finishing, shipping and your target margin.";
    if (s.includes("market") || s.includes("buyer") || s.includes("sell")) return "Best-fit buyer segments: Home décor stores (96%), eco-friendly retailers (92%), corporate gifting (86%), and interior designers (81%). I can explain why each segment matches your product and what action to take next.";
    if (s.includes("catalog") || s.includes("description")) return "Catalogue draft: Handwoven Bamboo Basket — a handcrafted natural-bamboo piece made using traditional handweaving techniques. Ideal for storage, gifting and sustainable home décor. Tags: bamboo, handmade, eco-friendly, home décor, traditional craft.";
    return "I’m Thedal. I can understand product images, work with files, create catalogues, suggest pricing, find suitable markets, improve product copy and answer normal questions. Upload a product or tell me what you want to do.";
  }

  return <main className="min-h-screen bg-[#fbf6ec] text-[#2b2118]">
    <style jsx global>{`html{scroll-behavior:smooth}body{margin:0}.serif{font-family:Georgia,'Times New Roman',serif}.grain{background-image:radial-gradient(rgba(43,33,24,.035) .7px,transparent .7px);background-size:8px 8px}.scrollbar::-webkit-scrollbar{width:6px}.scrollbar::-webkit-scrollbar-thumb{background:#d8cbb4;border-radius:99px}`}</style>

    <header className="sticky top-0 z-50 border-b border-[#e4d9c4] bg-[#fbf6ec]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 py-3 md:px-7">
        <div className="flex items-center gap-3">
          <button className="rounded-xl p-2 hover:bg-[#f3ecdd] md:hidden" onClick={()=>setMobile(!mobile)}>{mobile?<X size={20}/>:<Menu size={20}/>}</button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1c363d] text-[#d9a441]"><Sparkles size={20}/></div>
          <div><div className="serif text-xl font-semibold tracking-tight">KALA LINK <span className="text-[#a63d40]">AI</span></div><div className="hidden text-[9px] font-bold uppercase tracking-[.22em] text-[#806f5d] sm:block">From craft to market</div></div>
        </div>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#6b5d4f] md:flex"><button className="text-[#2b2118]">Thedal</button><button>Marketplace</button><button>My Products</button><button>Insights</button></nav>
        <div className="flex items-center gap-2"><button onClick={()=>setOpen(true)} className="hidden rounded-full border border-[#d7c9b0] px-4 py-2 text-xs font-bold md:block">Open assistant</button><button className="h-9 w-9 rounded-full bg-[#a63d40] text-sm font-bold text-white">TV</button></div>
      </div>
      {mobile && <div className="border-t border-[#e4d9c4] bg-[#fffaf0] p-4 md:hidden"><div className="grid gap-2 text-sm font-semibold"><button className="rounded-lg bg-[#f3ecdd] p-3 text-left">Thedal</button><button className="p-3 text-left">Marketplace</button><button className="p-3 text-left">My Products</button><button className="p-3 text-left">Insights</button></div></div>}
    </header>

    <div className="mx-auto grid min-h-[calc(100vh-66px)] max-w-[1380px] md:grid-cols-[245px_1fr]">
      <aside className="hidden border-r border-[#e4d9c4] px-4 py-5 md:block">
        <button onClick={()=>{setMessages([]);setOpen(false)}} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c363d] px-4 py-3 text-sm font-bold text-white"><Plus size={16}/> New conversation</button>
        <div className="mt-7 px-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#9a8872]">Tools</div>
        <div className="mt-2 grid gap-1"><button onClick={()=>setMode("catalogue")} className={`flex items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold ${mode==='catalogue'?'bg-[#f3ecdd]':''}`}><Sparkles size={16} className="text-[#a63d40]"/> Smart catalogue</button><button onClick={()=>setMode("market")} className={`flex items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold ${mode==='market'?'bg-[#f3ecdd]':''}`}><Store size={16} className="text-[#2a4b54]"/> Market linkage</button><button onClick={()=>setMode("search")} className={`flex items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold ${mode==='search'?'bg-[#f3ecdd]':''}`}><Search size={16} className="text-[#2a4b54]"/> Product search</button></div>
        <div className="mt-8 px-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#9a8872]">Recent chats</div>
        <div className="mt-2 space-y-1 text-xs text-[#6b5d4f]"><button className="w-full rounded-lg p-3 text-left hover:bg-[#f3ecdd]">Bamboo basket catalogue</button><button className="w-full rounded-lg p-3 text-left hover:bg-[#f3ecdd]">Best buyers for pottery</button><button className="w-full rounded-lg p-3 text-left hover:bg-[#f3ecdd]">Pricing for handmade goods</button></div>
        <div className="mt-auto pt-10"><div className="rounded-2xl border border-[#e4d9c4] bg-white p-4"><p className="text-xs font-bold">Thedal AI</p><p className="mt-1 text-[11px] leading-5 text-[#806f5d]">Your digital business assistant for craft, catalogue and markets.</p><span className="mt-3 inline-block rounded-full bg-[#e4efe7] px-2 py-1 text-[9px] font-bold text-[#2e6b3e]">READY</span></div></div>
      </aside>

      <section className="grain relative flex min-w-0 flex-col">
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 pb-10 pt-10 md:px-8 md:pt-14">
          {!open && <div className="flex min-h-[66vh] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1c363d] text-[#d9a441] shadow-lg"><Bot size={30}/></div>
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#a63d40]">Meet Thedal</p>
            <h1 className="serif mt-3 text-4xl font-semibold tracking-tight text-[#1c363d] md:text-6xl">What can I help you<br/><span className="text-[#a63d40]">build today?</span></h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#806f5d] md:text-base">Your all-in-one AI assistant for artisans. Chat naturally, understand product photos and files, create market-ready catalogues, discover buyers and get practical business guidance.</p>
            <div className="mt-9 grid w-full max-w-3xl gap-3 sm:grid-cols-2">{suggestions.map(([title,desc])=><button key={title} onClick={()=>send(desc)} className="rounded-2xl border border-[#e4d9c4] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#bcae92] hover:shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-bold text-[#1c363d]">{title}</span><Sparkles size={15} className="text-[#d9a441]"/></div><p className="mt-1 text-xs leading-5 text-[#806f5d]">{desc}</p></button>)}</div>
          </div>}

          {open && <div className="pb-32">{messages.map((m,i)=><div key={i} className={`mb-7 flex gap-3 ${m.role==='user'?'justify-end':''}`}><div className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-7 ${m.role==='user'?'bg-[#1c363d] text-white':'border border-[#e4d9c4] bg-white text-[#2b2118]'}`}>{m.role==='assistant'&&<div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#a63d40]"><Bot size={13}/> Thedal</div>}{m.text}</div></div>)}{messages.length===0 && <div className="rounded-3xl border border-[#e4d9c4] bg-white p-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#a63d40]">Smart catalogue</p><h2 className="serif mt-2 text-3xl font-semibold text-[#1c363d]">Ready to understand your product.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#806f5d]">Upload a photo or describe the product. Thedal can turn the information into an editable catalogue, pricing insight and market matches.</p></div>}</div>}
        </div>

        <div className="sticky bottom-0 mx-auto w-full max-w-4xl px-4 pb-4 md:px-8">
          <div className="rounded-3xl border border-[#d8cbb4] bg-white/95 p-2 shadow-[0_12px_40px_rgba(43,33,24,.10)] backdrop-blur">
            <div className="flex items-end gap-2"><button className="m-1 rounded-2xl p-3 text-[#6b5d4f] hover:bg-[#f3ecdd]" title="Attach file"><Plus size={19}/></button><button className="m-1 hidden rounded-2xl p-3 text-[#6b5d4f] hover:bg-[#f3ecdd] sm:block" title="Image"><ImageIcon size={18}/></button><textarea value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} rows={1} placeholder="Message Thedal… ask anything or describe your product" className="max-h-32 min-h-[46px] flex-1 resize-none bg-transparent px-2 py-3 text-sm outline-none placeholder:text-[#9b8b77]"/><button className="m-1 rounded-2xl p-3 text-[#6b5d4f] hover:bg-[#f3ecdd]" title="Voice input"><Mic size={18}/></button><button onClick={()=>send()} className="m-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a63d40] text-white disabled:opacity-40" disabled={!query.trim()}><Send size={17}/></button></div>
            <div className="px-3 pb-1 pt-1 text-center text-[9px] text-[#9b8b77]">Thedal can make mistakes. Review AI-generated catalogue, pricing and market suggestions before publishing.</div>
          </div>
        </div>
      </section>

      <aside className="hidden border-l border-[#e4d9c4] bg-[#fffaf0] p-5 xl:block">
        <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a8872]">AI workspace</div>
        <div className="mt-3 rounded-2xl border border-[#e4d9c4] bg-white p-4"><div className="flex items-center justify-between"><b className="text-sm">Your products</b><span className="rounded-full bg-[#f3ecdd] px-2 py-1 text-[9px] font-bold">3</span></div>{products.map(p=><button key={p.name} onClick={()=>send(`Create a catalogue for ${p.name}`)} className="mt-3 flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-[#fbf6ec]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3ecdd] text-xl">{p.emoji}</span><span className="min-w-0 flex-1"><b className="block truncate text-xs">{p.name}</b><span className="text-[10px] text-[#806f5d]">{p.meta}</span></span><span className="text-[10px] font-bold text-[#2e6b3e]">{p.score}%</span></button>)}</div>
        <div className="mt-4 rounded-2xl bg-[#1c363d] p-5 text-[#fbf6ec]"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#d9a441]">Market insight</p><h3 className="serif mt-2 text-xl">Home décor is your strongest fit.</h3><p className="mt-2 text-xs leading-5 text-[#d9e4df]">Thedal sees strong alignment between natural materials, handcrafted design and décor buyer intent.</p><button onClick={()=>send("Find markets for my bamboo basket")} className="mt-4 rounded-full bg-[#d9a441] px-4 py-2 text-[11px] font-bold text-[#2b2118]">Explore markets</button></div>
        <div className="mt-4 rounded-2xl border border-[#e4d9c4] bg-white p-4"><div className="flex items-center gap-2 text-xs font-bold"><FileText size={15} className="text-[#a63d40]"/> AI confidence</div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f3ecdd]"><div className="h-full w-[92%] rounded-full bg-[#2a4b54]"/></div><p className="mt-2 text-[10px] text-[#806f5d]">Generated fields are editable and should be reviewed before publishing.</p></div>
      </aside>
    </div>
  </main>;
}
