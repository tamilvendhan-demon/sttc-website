import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: [
      { id: "thedal-local", owned_by: "thedal-ai" },
      ...(process.env.OPENAI_API_KEY ? [{ id: process.env.THEDAL_MODEL || "gpt-4o", owned_by: "provider" }] : []),
    ],
  });
}
