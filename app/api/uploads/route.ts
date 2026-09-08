import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { filename, data } = await req.json();
    if (!filename || !data) return NextResponse.json({ error: 'filename and data required' }, { status: 400 });

    // data is expected to be a base64 data URL or raw base64
    const matches = (data as string).match(/^data:(.+);base64,(.*)$/);
    const b64 = matches ? matches[2] : data;
    const buffer = Buffer.from(b64, 'base64');

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const outPath = path.join(uploadsDir, safeName);
    fs.writeFileSync(outPath, buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) return new NextResponse(JSON.stringify({ files: [] }), { status: 200 });
    const files = fs.readdirSync(uploadsDir).map((f) => ({ name: f, url: `/uploads/${f}` }));
    return NextResponse.json({ files });
  } catch (e) {
    return NextResponse.json({ files: [] });
  }
}
