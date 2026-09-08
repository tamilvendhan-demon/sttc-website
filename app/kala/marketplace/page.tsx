"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = { id: string; title: string; description?: string; shortDescription?: string; category?: string; material?: string; price?: number; tags?: string[]; location?: string; artisanId?: string; status?: string };

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<{ id: string; name: string; verificationStatus?: string }[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("Any price");

  useEffect(() => { fetch("/api/products/list").then((response) => response.json()).then((data) => { setProducts(data.products || []); setArtisans(data.artisans || []); }); }, []);
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))];
  const visibleProducts = useMemo(() => products.filter((product) => {
    const text = `${product.title} ${product.description || ""} ${(product.tags || []).join(" ")}`.toLowerCase();
    const matchesQuery = !query || text.includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = maxPrice === "Any price" || (product.price || 0) <= Number(maxPrice);
    return matchesQuery && matchesCategory && matchesPrice && product.status !== "Rejected";
  }), [products, query, category, maxPrice]);
  const artisanFor = (id?: string) => artisans.find((artisan) => artisan.id === id);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <section className="rounded-[28px] bg-[#0b3733] p-7 text-[#f6f0de] md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e7c97c]">Buyer discovery</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">Find craft with a story.</h1><p className="mt-3 max-w-2xl leading-7 text-[#dce9dc]">Search by intent, explore verified artisans, and discover handmade products matched to the way you want to buy.</p><div className="mt-6 flex flex-col gap-3 md:flex-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: eco-friendly handmade gifts under ₹1000" className="min-h-12 flex-1 rounded-xl border-0 bg-white px-4 text-[#0b3733] outline-none ring-2 ring-transparent focus:ring-[#c99a45]" /><button onClick={() => setQuery("eco-friendly handmade")} className="rounded-xl bg-[#c99a45] px-5 py-3 text-sm font-semibold text-white">AI search</button></div></section>
      <section className="mt-8 flex flex-col gap-3 border-b border-[#e6dcc1] pb-5 md:flex-row md:items-center"><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-[#155a50] text-white" : "bg-white text-[#155a50] ring-1 ring-[#d8c892]"}`}>{item}</button>)}</div><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="rounded-full border border-[#d8c892] bg-white px-4 py-2 text-sm text-[#155a50] md:ml-auto"><option>Any price</option><option value="500">Under ₹500</option><option value="1000">Under ₹1,000</option><option value="2000">Under ₹2,000</option></select></section>
      <div className="mt-8 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a45]">Curated marketplace</p><h2 className="mt-1 text-2xl font-semibold text-[#0b3733]">{visibleProducts.length} products to explore</h2></div><Link href="/kala/products/new" className="text-sm font-semibold text-[#155a50]">Are you an artisan? →</Link></div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => { const artisan = artisanFor(product.artisanId); return <Link href={`/kala/products/${product.id}`} key={product.id} className="group overflow-hidden rounded-2xl border border-[#e6dcc1] bg-white transition hover:-translate-y-1 hover:shadow-xl"><div className="flex h-48 items-center justify-center bg-[#eadfc3]">{product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" /> : <span className="text-6xl text-[#c99a45]">✦</span>}</div><div className="p-5"><div className="flex items-center justify-between gap-2"><span className="rounded-full bg-[#e6f2e9] px-2 py-1 text-[11px] font-semibold text-[#155a50]">AI match 92%</span><span className="text-xs text-[#8b8069]">{product.category || "Handmade"}</span></div><h3 className="mt-3 text-lg font-semibold text-[#0b3733] group-hover:text-[#155a50]">{product.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#706a5e]">{product.description || product.shortDescription || "Made by hand with care."}</p><div className="mt-5 flex items-end justify-between"><div><p className="text-sm font-semibold text-[#0b3733]">{artisan?.name || "THEDAL artisan"}</p><p className="text-xs text-[#8b8069]">{product.location || "India"} · {artisan?.verificationStatus === "Verified" ? "Verified artisan" : "Community seller"}</p></div><strong className="text-lg text-[#155a50]">₹{product.price || "—"}</strong></div></div></Link>; })}</div>
      {!visibleProducts.length && <div className="mt-8 rounded-2xl border border-dashed border-[#d8c892] p-10 text-center text-[#706a5e]">No products match this search. Try a wider category or price range.</div>}
    </div>
  );
}
