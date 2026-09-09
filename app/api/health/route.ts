import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "kala-link-ai",
    aiConfigured: Boolean(process.env.OPENAI_API_KEY),
    timestamp: new Date().toISOString(),
  });
}
