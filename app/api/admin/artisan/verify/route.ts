import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { id, action } = await req.json();
    const p = path.join(process.cwd(), 'data', 'demoData.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(raw);
    const artisan = (json.artisans || []).find((x: any) => x.id === id);
    if (!artisan) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
    if (action === 'verify') artisan.verificationStatus = 'Verified';
    if (action === 'reject') artisan.verificationStatus = 'Rejected';
    fs.writeFileSync(p, JSON.stringify(json, null, 2), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
