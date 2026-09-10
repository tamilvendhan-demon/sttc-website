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

function localAnswer(q: string) {
  const text = q.trim();
  if (!text) return "Hi! I'm Thedal AI. Ask me anything — product catalogue, pricing, market linkage, writing, calculations, study help or a normal question.";
  const lower = text.toLowerCase();
  const tanglish = /\b(na|enaku|enga|epdi|enna|venum|pannu|kodu|irukku|illa|pathi|price|product|buyer|market)\b/i.test(text);
  const tamil = /[\u0B80-\u0BFF]/.test(text);
  if (/^(hi|hello|hey|hai|vanakkam|வணக்கம்)\b/i.test(text)) return tanglish || tamil ? "Vanakkam nanba! 👋 Naan Thedal AI. Enna venumnaalum kelu — product, business, study, writing, calculations, market linkage ellathulayum help panren." : "Hello! 👋 I'm Thedal AI. Ask me anything — product intelligence, business, writing, calculations, planning, or general questions.";
  if (/\d+\s*[+\-*\/]\s*\d+/.test(text)) {
    const m = text.match(/(\d+(?:\.\d+)?)\s*([+\-*\/])\s*(\d+(?:\.\d+)?)/);
    if (m) { const a=Number(m[1]),b=Number(m[3]); const r=m[2]==='+'?a+b:m[2]==='-'?a-b:m[2]==='*'?a*b:b?a/b:NaN; if(Number.isFinite(r)) return `Calculation: **${m[1]} ${m[2]} ${m[3]} = ${r}**`; }
  }
  if (/(catalog|catalogue|listing|product description|product title)/i.test(lower)) return "I can create a complete catalogue with title, category, material, craft type, description, tags, keywords, target buyers and pricing considerations. Send the product name, material, size, making time and any photo/details you have.";
  if (/(price|pricing|cost|rate|விலை)/i.test(lower)) return "For transparent pricing, calculate **material + fair labour + packaging + transport + overheads + selling costs + profit margin**. Give me the material cost, working hours, quantity and current expected selling price and I can work out a range.";
  if (/(buyer|market|selling|sell|market linkage|விற்பனை|சந்தை)/i.test(lower)) return "Potential buyer segments include home-décor retailers, gift shops, interior designers, eco-friendly stores, corporate gifting and bulk institutional buyers. These are potential segments, not confirmed buyers, until real marketplace data verifies them.";
  return `I'm Thedal AI. I can work through **${text}** step by step. Give me any useful context and I'll help you solve it. For artisan products, I can also turn your details into a catalogue, pricing plan and target-market strategy.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const messages = incoming.filter((m:any) => m?.role && m.role !== "system");
    const latest = messages[messages.length - 1];
    const latestText = textFromContent(latest?.content);
    const key = process.env.OPENAI_API_KEY;

    if (key) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: process.env.THEDAL_MODEL || "gpt-4o",
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          temperature: typeof body.temperature === "number" ? body.temperature : 0.7,
          max_tokens: body.max_tokens || 4096
        }),
        cache: "no-store"
      });
      if (response.ok) return NextResponse.json(await response.json());
    }

    return NextResponse.json({
      id: `thedal-${Date.now()}`, object: "chat.completion", created: Math.floor(Date.now()/1000), model: "thedal-local",
      choices: [{ index: 0, message: { role: "assistant", content: localAnswer(latestText) }, finish_reason: "stop" }]
    });
  } catch (error) {
    return NextResponse.json({ error: "Thedal request failed", detail: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
