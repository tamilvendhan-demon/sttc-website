import { NextResponse } from 'next/server';
import aiClient from '../../../../lib/ai/client';

export async function GET() {
  try {
    const messages = [{ role: 'user', content: 'Give a short catalogue JSON for a handwoven jute bag.' }];
    const r = await aiClient.streamOpenAIChat(messages as any);
    if (r.mock && r.stream) {
      return new NextResponse(r.stream, { headers: { 'Content-Type': 'text/event-stream' } });
    }
    if (r.stream) {
      return new NextResponse(r.stream, { headers: { 'Content-Type': 'text/event-stream' } });
    }
    return NextResponse.json({ error: 'No stream available' }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
