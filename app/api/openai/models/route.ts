import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: { message: "OPENAI_API_KEY is not configured on the server." } }, { status: 500 });
  }
  return NextResponse.json({ data: [{ id: "gpt-4o" }] });
}
