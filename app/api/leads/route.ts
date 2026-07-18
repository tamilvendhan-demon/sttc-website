import { NextRequest, NextResponse } from "next/server";
import { loadLeads, saveLead } from "@/app/lib/leadStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await loadLeads();
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const name = typeof payload?.name === "string" ? payload.name.trim() : "";
    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    const phone = typeof payload?.phone === "string" ? payload.phone.trim() : "";
    const service = typeof payload?.service === "string" ? payload.service.trim() : "";
    const notes = typeof payload?.notes === "string" ? payload.notes.trim() : "";
    const preferredSlot = typeof payload?.preferredSlot === "string" ? payload.preferredSlot.trim() : "";
    const source = payload?.source === "appointment" ? "appointment" : "contact";

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Please provide your name, email, phone number, and service requirement." },
        { status: 400 },
      );
    }

    const lead = await saveLead({
      name,
      email,
      phone,
      service,
      notes,
      preferredSlot,
      source,
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save request" },
      { status: 500 },
    );
  }
}
