import { NextResponse } from "next/server";

const THEdal_SYSTEM_PROMPT = `You are Thedal AI, the intelligent digital business assistant inside KALA LINK AI for marginalized artisans.

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

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: { message: "OPENAI_API_KEY is not configured on the server." } },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages = [
      { role: "system", content: THEdal_SYSTEM_PROMPT },
      ...incomingMessages.filter((message: { role?: string }) => message?.role !== "system"),
    ];

    const model = process.env.THEDAL_MODEL || "gpt-5.6-sol";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        input: messages,
        max_output_tokens: body.max_tokens || 4096,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const outputText =
      typeof data.output_text === "string"
        ? data.output_text
        : Array.isArray(data.output)
          ? data.output
              .flatMap((item: { content?: Array<{ text?: string }> }) => item?.content || [])
              .map((item: { text?: string }) => item?.text || "")
              .join("")
          : "";

    // Keep the response shape expected by the existing exact HTML interface.
    return NextResponse.json({
      id: data.id,
      object: "chat.completion",
      model: data.model || model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: outputText },
          finish_reason: "stop",
        },
      ],
      usage: data.usage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "AI request failed." } },
      { status: 500 },
    );
  }
}
