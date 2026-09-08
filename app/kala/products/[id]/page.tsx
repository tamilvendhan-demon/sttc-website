import Link from "next/link";
import fs from "fs";
import path from "path";

function loadProduct(id: string) {
  const file = path.join(process.cwd(), "data", "demoData.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const product = (data.products || []).find((item: { id: string }) => item.id === id);
  const artisan = (data.artisans || []).find((item: { id: string }) => item.id === product?.artisanId);
  return { product, artisan };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, artisan } = loadProduct(id);

  if (!product) {
    return <div className="mx-auto max-w-4xl px-5 py-16"><h1 className="text-3xl font-semibold text-[#0b3733]">Product not found</h1><Link href="/kala/marketplace" className="mt-4 inline-block text-[#155a50]">Back to marketplace →</Link></div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <Link href="/kala/marketplace" className="text-sm font-semibold text-[#155a50]">← Back to marketplace</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex min-h-[420px] items-center justify-center rounded-[28px] bg-[#eadfc3] p-8">
          {product.imageUrl || product.images?.[0] ? <img src={product.imageUrl || product.images[0]} alt={product.title} className="max-h-[420px] w-full rounded-2xl object-cover" /> : <div className="text-center"><div className="text-8xl">✦</div><p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#8a5b12]">Demo craft image</p></div>}
        </div>
        <div className="py-3">
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#e6f2e9] px-3 py-1 text-xs font-semibold text-[#155a50]">Verified artisan</span><span className="rounded-full bg-[#fff1d5] px-3 py-1 text-xs font-semibold text-[#8a5b12]">AI match 92%</span></div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0b3733]">{product.title}</h1>
          <p className="mt-3 text-3xl font-semibold text-[#155a50]">₹{product.price || "Price on request"}</p>
          <p className="mt-5 text-base leading-8 text-[#5f5a50]">{product.description || product.shortDescription || "A thoughtful handmade product carrying the story and skill of its maker."}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-white p-3 ring-1 ring-[#e6dcc1]"><span className="block text-xs uppercase tracking-[0.15em] text-[#8b8069]">Material</span><strong className="mt-1 block text-[#0b3733]">{product.material || "Natural material"}</strong></div><div className="rounded-xl bg-white p-3 ring-1 ring-[#e6dcc1]"><span className="block text-xs uppercase tracking-[0.15em] text-[#8b8069]">Craft</span><strong className="mt-1 block text-[#0b3733]">{product.craftType || "Handmade"}</strong></div></div>
          <div className="mt-7 flex flex-wrap gap-3"><Link href={`/kala/products/${product.id}/inquiry`} className="rounded-full bg-[#155a50] px-5 py-3 text-sm font-semibold text-white">Send inquiry</Link><Link href="/kala/marketplace" className="rounded-full border border-[#d8c892] px-5 py-3 text-sm font-semibold text-[#155a50]">Find similar crafts</Link></div>
          <div className="mt-8 border-t border-[#e6dcc1] pt-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a45]">Made by</p><p className="mt-2 text-xl font-semibold text-[#0b3733]">{artisan?.name || "THEDAL artisan"}</p><p className="mt-1 text-sm text-[#706a5e]">{artisan?.craftSpecialization || product.craftType || "Traditional craft"} · {artisan?.location || product.location || "India"}</p><p className="mt-4 text-sm leading-6 text-[#5f5a50]">Trust is built into every listing. Artisan verification is reviewed by people; AI suggestions remain editable and are never proof of authenticity.</p></div>
        </div>
      </div>
    </div>
  );
}
