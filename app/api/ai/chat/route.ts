import { NextResponse } from 'next/server';
import aiClient from '../../../../lib/ai/client';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const body = await req.json();
    const messageText = body.message;
    const stream = body.stream || false;

    if (stream && !aiClient.isMock()) {
      // Stream mode: call openai and pipe the response stream through
      const messages = [
        { role: 'system', content: 'You are THEdal, an AI assistant for artisans.' },
        { role: 'user', content: messageText }
      ];
      const result = await aiClient.streamOpenAIChat(messages);
      if (result.mock) {
        return NextResponse.json({ reply: 'Streaming not available in mock mode' });
      }

      return new Response(result.stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
      });
    }

    const r = await aiClient.chat(messageText as string);
    return NextResponse.json({ reply: r.reply, raw: r.raw });
  } catch (e: any) {
    return NextResponse.json({ reply: 'Thedal encountered an error.', error: String(e) }, { status: 500 });
  }
}
