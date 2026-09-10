import { NextResponse } from "next/server";

const SYSTEM = `You are Thedal AI, a capable general-purpose assistant inside an artisan marketplace. Answer naturally and helpfully. Support English, Tamil, Tanglish and Hindi. Help with general questions, writing, calculations, artisan product catalogues, pricing methodology, market linkage, buyer targeting and business planning. Never invent facts, verified buyers, certifications or sources. Match the user's language and explain uncertainty when needed.`;

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content.map((part: any) => {
    if (typeof part === "string") return part;
    if (part?.type === "text") return String(part.text ?? "");
    if (part?.content) return textFromContent(part.content);
    if (part?.message?.content) return textFromContent(part.message.content);
    return "";
  }).filter(Boolean).join("\n");
}

function localCatalogue(q: string) {
  const name = q.match(/Name:\s*"([^"]+)"/i)?.[1] || "Handmade Artisan Product";
  const material = q.match(/Material:\s*"([^"]+)"/i)?.[1] || "Natural / artisan material";
  const priceText = q.match(/Artisan's own price:\s*"([^"]+)"/i)?.[1] || "";
  const numeric = Number((priceText.match(/[0-9]+(?:\.[0-9]+)?/) || [""])[0]);
  const low = Number.isFinite(numeric) && numeric > 0 ? Math.max(100, Math.round(numeric * .85)) : 400;
  const high = Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric * 1.35) : 1200;
  const rec = Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : Math.round((low + high) / 2);
  return JSON.stringify({
    productName: name, category: "Handmade / Home Décor", subCategory: "Artisan Craft", material,
    craftType: "Handcrafted", style: "Traditional contemporary", colour: "Natural / as shown",
    description: `A handmade artisan product crafted with ${material}. The listing should be reviewed by the artisan and edited to reflect the exact materials, process and story.`,
    tags: ["Handmade", material, "Artisan", "Craft", "Made in India"],
    confidence: 62, confidenceNote: "Local AI mode cannot independently verify every visual or material detail; please confirm the generated fields.",
    photoQualityScore: 0, photoSuggestions: [], priceLow: low, priceHigh: high, priceRecommended: rec,
    priceFactors: "Estimate considers artisan labour, material, packaging, selling costs and a sustainable margin; it is not a verified market price.",
    marketMatches: [
      { segment: "Home Décor Stores", score: 88, why: "Strong fit for handmade, design-led artisan products." },
      { segment: "Gift Shops", score: 82, why: "Handcrafted products can suit curated gifting collections." },
      { segment: "Eco-Friendly Retailers", score: 78, why: "Potential fit when materials and sourcing are confirmed." }
    ]
  });
}

function localAnswer(q: string, system = "") {
  const text = q.trim();
  if (/cataloguing engine|catalogue json|catalogue JSON/i.test(system + " " + text)) return localCatalogue(text);
  if (!text) return "Hi! I'm Thedal AI. Ask me anything — product catalogue, pricing, market linkage, writing, calculations, study help or a normal question.";
  const lower = text.toLowerCase();
  const tanglish = /\b(na|enaku|enga|epdi|enna|venum|pannu|kodu|irukku|illa|pathi|price|product|buyer|market)\b/i.test(text);
  const tamil = /[\u0B80-\u0BFF]/.test(text);
  if (/^(hi|hello|hey|hai|vanakkam|வணக்கம்)\b/i.test(text)) return tanglish || tamil ? "Vanakkam nanba! 👋 Naan Thedal AI. Enna venumnaalum kelu — product, business, study, writing, calculations, market linkage ellathulayum help panren." : "Hello! 👋 I'm Thedal AI. Ask me anything — product intelligence, business, writing, calculations, planning, or general questions.";
  const m = text.match(/(\d+(?:\.\d+)?)\s*([+\-*\/])\s*(\d+(?:\.\d+)?)/);
  if (m) { const a=Number(m[1]),b=Number(m[3]); const r=m[2]==='+'?a+b:m[2]==='-'?a-b:m[2]==='*'?a*b:b?a/b:NaN; if(Number.isFinite(r)) return `Calculation: **${m[1]} ${m[2]} ${m[3]} = ${r}**`; }
  if (/(catalog|catalogue|listing|product description|product title)/i.test(lower)) return "I can create a complete catalogue with title, category, material, craft type, description, tags, keywords, target buyers and pricing considerations. Send product details or use the Add Product flow.";
  if (/(price|pricing|cost|rate|விலை)/i.test(lower)) return "For transparent pricing, calculate material + fair labour + packaging + transport + overheads + selling costs + profit margin. Give me your numbers and I can calculate a range.";
  if (/(buyer|market|selling|sell|market linkage|விற்பனை|சந்தை)/i.test(lower)) return "Potential buyer segments include home-décor retailers, gift shops, interior designers, eco-friendly stores, corporate gifting and bulk institutional buyers. These are potential segments, not confirmed buyers.";
  return `I understand: **${text}**. I can help you work through it step by step. Give me the context you have and I’ll build the answer rather than just showing a fixed suggestion.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const system = incoming.find((m:any) => m?.role === "system")?.content || "";
    const messages = incoming.filter((m:any) => m?.role && m.role !== "system");
    const latest = messages[messages.length - 1];
    const latestText = textFromContent(latest?.content);
    const key = process.env.OPENAI_API_KEY;

    if (key) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model: process.env.THEDAL_MODEL || "gpt-4o", messages: [{ role: "system", content: SYSTEM }, ...messages], temperature: typeof body.temperature === "number" ? body.temperature : 0.7, max_tokens: body.max_tokens || 4096 }), cache: "no-store"
      });
      if (response.ok) return NextResponse.json(await response.json());
    }
    return NextResponse.json({ id:`thedal-${Date.now()}`,object:"chat.completion",created:Math.floor(Date.now()/1000),model:"thedal-local",choices:[{index:0,message:{role:"assistant",content:localAnswer(latestText,system)},finish_reason:"stop"}] });
  } catch (error) {
    return NextResponse.json({ error:"Thedal request failed", detail:error instanceof Error ? error.message : "Unknown error" }, { status:500 });
  }
}
