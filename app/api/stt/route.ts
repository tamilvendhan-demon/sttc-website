import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const form = await (req as any).formData();
    const audio = form.get('audio') as any;
    if (!audio) return NextResponse.json({ error: 'audio required' }, { status: 400 });

    const buffer = Buffer.from(await audio.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filename = `voice-${Date.now()}.webm`;
    const outPath = path.join(uploadsDir, filename);
    fs.writeFileSync(outPath, buffer);

    // If OPENAI_API_KEY present, call Whisper (optional). Otherwise return mock.
    const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
    if (!OPENAI_KEY) {
      // Return a friendly mock transcript
      const transcript = 'Handwoven bamboo storage basket with natural finish, suitable for home décor and gifting.';
      return NextResponse.json({ ok: true, transcript, url: `/uploads/${filename}` });
    }

    try {
      const formData = new FormData();
      formData.append('file', new Blob([buffer]), filename as any);
      formData.append('model', 'whisper-1');
      const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${OPENAI_KEY}` },
        body: formData as any,
      });
      const j = await r.json();
      const transcript = j.text || j.transcript || '';
      return NextResponse.json({ ok: true, transcript, url: `/uploads/${filename}`, raw: j });
    } catch (err) {
      return NextResponse.json({ ok: true, transcript: 'Transcription failed', url: `/uploads/${filename}` });
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
