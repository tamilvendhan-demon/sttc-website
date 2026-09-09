import { NextResponse } from "next/server";

const THEDAL_SYSTEM_PROMPT = `You are Thedal AI, the intelligent digital business assistant inside Thedal AI for marginalized artisans.

Your personality and interaction style should feel like a modern ChatGPT-quality assistant: natural, helpful, accurate, context-aware, concise when the question is simple and detailed when the task needs it. Never claim to be ChatGPT or OpenAI; you are Thedal AI.

Core mission:
- Help artisans understand, describe, catalogue, price, improve, and market their products.
- Help users with normal questions, writing, rewriting, summarizing, planning, calculations, and explanations.
- When discussing an artisan product, turn incomplete information into useful catalogue-ready content while clearly marking assumptions.
- Support market linkage by identifying relevant buyer segments, use cases, and market opportunities. Do not invent real buyer relationships or claim a buyer is verified unless the application provides that data.
- Give practical, actionable suggestions that are easy for artisans to follow.

Catalogue behavior:
- For product requests, infer likely title, category, craft/material, description, tags, keywords, target buyers, and pricing considerations when possible.
- Separate observed facts from assumptions. If an image or source does not establish something, say so.
- Never treat AI output as proof of authenticity, origin, certification, or legal compliance. Human/admin verification remains final.

Language:
- Match the user's language and style. Tamil, Tanglish, Hindi, and English are supported.
- If the user writes Tanglish, respond naturally in Tanglish unless they ask for another language.

Safety and trust:
- Do not fabricate sources, buyers, prices, certifications, or market statistics.
- When information is uncertain, explain the uncertainty and suggest what data would improve the answer.
- Protect private information and never ask for passwords, API keys, or unnecessary sensitive credentials.

You are the primary reasoning layer for Thedal AI. Make every answer useful even when the user has not provided a perfectly structured request.`;

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => typeof part === "string" ? part : String((part as { text?: unknown })?.text ?? "")).join(" ");
  }
  return "";
}

function keylessThedalAnswer(input: string): string {
  const q = input.trim();
  const lower = q.toLowerCase();
  const tanglish = /\b(na|enaku|enga|epdi|enna|venum|pannu|kodunga|kodu|irukku|illa|pathi|market|price|product|catalog|buyer|sell|business)\b/i.test(q);
  const tamil = /[\u0B80-\u0BFF]/.test(q);
  const lang = tamil ? "ta" : tanglish ? "tg" : "en";

  if (!q) return lang === "en"
    ? "Hi! I'm Thedal AI. Ask me anything, or try: Create a product catalogue, suggest a price, find target buyers, improve my product description, or explain something."
    : "Hi nanba! Naan Thedal AI. Product catalogue, price suggestion, target buyers, market linkage, writing, explanation — edhu venumnaalum kelu.";

  if (/^(hi|hello|hey|vanakkam|வணக்கம்|hai)\b/i.test(q)) {
    return lang === "en"
      ? "Hello! 👋 I'm Thedal AI. I can help with product catalogues, pricing, market linkage, buyer targeting, writing, planning, and general questions. What shall we work on?"
      : "Vanakkam nanba! 👋 Naan Thedal AI. Product catalogue, pricing, market linkage, buyer targeting, writing, planning ellathulayum help panren. Enna start pannalaam?";
  }

  if (/(catalog|catalogue|listing|product description|product title|product listing|கேடலாக்|பட்டியல்)/i.test(q)) {
    return lang === "en"
      ? `### Smart Product Catalogue\n\n**Product title:** [Create a clear, searchable name]\n**Category:** [Craft / Home Décor / Fashion / Utility]\n**Material:** [Confirm the actual material]\n**Craft:** [Traditional technique, if known]\n**Description:** A handcrafted product made with attention to detail and cultural craft value. Add dimensions, finish, use case and care instructions before publishing.\n**Tags:** handmade, artisan, handcrafted, traditional craft\n**Keywords:** handmade craft, artisan product, Indian handicraft\n**Target buyers:** Home décor stores, gift shops, interior designers, eco-friendly retailers and corporate gifting buyers.\n**Pricing:** Calculate material + labour + overhead + packaging + platform/market costs, then add a sustainable margin.\n\n**Important:** I have not assumed facts that were not provided. Send the product name, material, size, approximate making time and location for a more specific catalogue.`
      : `### Smart Product Catalogue\n\n**Product title:** Clear-aa search panna easy-a irukkura product name\n**Category:** Craft / Home Décor / Fashion / Utility\n**Material:** Actual material confirm pannanum\n**Craft:** Traditional technique therinja add pannalaam\n**Description:** Kai-vinaignar seyyum handcrafted product. Publish panna munnaadi size, finish, usage, care details add pannunga.\n**Tags:** handmade, artisan, handcrafted, traditional craft\n**Target buyers:** Home décor stores, gift shops, interior designers, eco-friendly retailers, corporate gifting buyers.\n**Pricing:** Material + labour + overhead + packaging + selling costs + sustainable margin calculate pannunga.\n\n**Note:** Nee kudutha information-ku mela facts assume pannala. Product name, material, size, making time, location kudutha innum precise catalogue ready panniduven.`;
  }

  if (/(price|pricing|cost|rate|விலை|விலையை)/i.test(q)) {
    return lang === "en"
      ? `### Practical Pricing Method\n\n1. Material cost\n2. Labour cost = hours × fair hourly rate\n3. Packaging and transport\n4. Overheads\n5. Selling/platform expenses\n6. Add a sustainable profit margin\n\n**Formula:** Selling Price = Material + Labour + Packaging + Overheads + Selling Costs + Profit.\n\nI won't invent a market price without product details. Give me material, size, making time, quantity and current material cost, and I can calculate a transparent price range.`
      : `### Practical Pricing\n\n1. Material cost\n2. Labour = working hours × fair hourly rate\n3. Packaging + transport\n4. Other overheads\n5. Selling/platform expense\n6. Sustainable profit margin\n\n**Formula:** Selling Price = Material + Labour + Packaging + Overheads + Selling Costs + Profit.\n\nProduct material, size, making time, quantity, material cost kudutha transparent price range calculate panniduven.`;
  }

  if (/(market|buyer|sell|selling|market linkage|வாங்க|சந்தை|விற்பனை)/i.test(q)) {
    return lang === "en"
      ? `### Market Linkage Suggestions\n\nBased on the information available, useful buyer segments to consider are:\n- Home décor retailers\n- Gift and handicraft stores\n- Interior designers\n- Eco-friendly / sustainable product stores\n- Corporate gifting teams\n- Bulk institutional buyers\n\n**Best next step:** Match the product's material, price band, minimum order quantity, location and production capacity to one or two segments first. Thedal should treat these as potential segments—not confirmed buyers—until real marketplace data or admin verification exists.`
      : `### Market Linkage Suggestions\n\nProduct details base panni potential buyer segments:\n- Home décor retailers\n- Gift & handicraft stores\n- Interior designers\n- Eco-friendly stores\n- Corporate gifting\n- Bulk institutional buyers\n\n**Next step:** Material, price range, MOQ, location, monthly production capacity ivai base panni 1–2 buyer segments first target pannunga. Iva potential segments mattum; verified buyers nu claim panna koodadhu.`;
  }

  if (/(what can you do|help|features|enna help|enna panna|என்ன உதவி)/i.test(q)) {
    return lang === "en"
      ? `I can help you with:\n\n• Product catalogue generation\n• Product descriptions and titles\n• Pricing methodology\n• Buyer and market-segment matching\n• Business ideas and planning\n• Rewriting, summarising and translating\n• Study and general explanations\n• Checklists and step-by-step guidance\n\nFor image-based product analysis, a vision model can be connected later; I won't pretend to see details that aren't actually available to me.`
      : `Naan help panna mudiyum:\n\n• Product catalogue generate panna\n• Product title & description\n• Pricing calculation/method\n• Buyer & market matching\n• Business ideas & planning\n• Rewrite / summary / translation\n• Study & general explanations\n• Step-by-step guidance\n\nImage-la irukkura exact details analyse panna proper vision model later connect pannalaam; paakala na paathen nu naan claim panna maatten.`;
  }

  if (/(calculate|\d+\s*[+\-*\/]\s*\d+|percentage|percent|கணக்கு)/i.test(q)) {
    const expr = q.match(/[-+*/]?\s*\d+(?:\.\d+)?\s*[+\-*\/]\s*\d+(?:\.\d+)?/);
    if (expr) {
      try {
        const safe = expr[0].replace(/\s/g, "");
        if (/^[\d.]+[+\-*/][\d.]+$/.test(safe)) {
          const [a, op, b] = safe.split(/([+\-*/])/);
          const x = Number(a), y = Number(b);
          const result = op === "+" ? x + y : op === "-" ? x - y : op === "*" ? x * y : y !== 0 ? x / y : NaN;
          if (Number.isFinite(result)) return `Calculation: **${safe} = ${result}**`;
        }
      } catch {}
    }
  }

  if (/(website|app|software|code|coding|developer|github|next\.js|react)/i.test(q)) {
    return lang === "en"
      ? `For a website/app task, I can help break it into a practical plan: **goal → user flow → UI → data model → API → validation → testing → deployment**. For Thedal specifically, the AI layer should remain useful even when an external LLM provider is unavailable, while provider-backed intelligence can be added later.`
      : `Website/app task-ku practical flow: **goal → user flow → UI → data model → API → validation → testing → deployment**. Thedal-la external AI provider illa naalum basic business intelligence useful-aa work aaganum; later stronger model connect pannalaam.`;
  }

  return lang === "en"
    ? `I'm Thedal AI. I can help you work through this step by step. If this is about an artisan product, send the **product name + material + size + making time + intended price/market**, and I'll turn it into a useful catalogue and market plan. For a general question, just ask it normally.`
    : `Naan Thedal AI. Idha step-by-step help panren. Artisan product-na **product name + material + size + making time + expected price/market** kudunga; catalogue + market plan ready panniduven. General question-na normal-aa kelu.`;
}

function fallbackResponse(text: string) {
  return NextResponse.json({
    id: `thedal-local-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: "thedal-local",
    choices: [{
      index: 0,
      message: { role: "assistant", content: keylessThedalAnswer(text) },
      finish_reason: "stop",
    }],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
    const cleanMessages = incomingMessages.filter((message: { role?: string }) => message?.role !== "system");
    const latest = cleanMessages.length ? cleanMessages[cleanMessages.length - 1] : null;
    const latestText = textFromContent(latest?.content);
    const key = process.env.OPENAI_API_KEY;

    // Keyless mode is the default so the deployed product remains usable without credentials.
    // If a provider key is later configured, Thedal automatically upgrades to the stronger model path.
    if (!key) return fallbackResponse(latestText);

    const messages = [
      { role: "system", content: THEDAL_SYSTEM_PROMPT },
      ...cleanMessages,
    ];
    const model = process.env.THEDAL_MODEL || "gpt-4o";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: typeof body.temperature === "number" ? body.temperature : 0.7,
        max_tokens: body.max_tokens || 4096,
      }),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) return fallbackResponse(latestText);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      id: `thedal-error-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "thedal-local",
      choices: [{
        index: 0,
        message: { role: "assistant", content: `Thedal AI fallback mode active. ${error instanceof Error ? error.message : "Request completed with the local assistant."}` },
        finish_reason: "stop",
      }],
    });
  }
}
