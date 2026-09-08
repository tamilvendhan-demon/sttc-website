import { NextResponse } from 'next/server';
import aiClient from '../../../../lib/ai/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inputType, text, imageUrl } = body || {};
    if (aiClient.isMock()) {
      const demo = await aiClient.generateCatalogueFromText(text || '');
      return NextResponse.json(demo);
    }

    if (inputType === 'image' && imageUrl) {
      const result = await aiClient.generateCatalogueFromImage(imageUrl);
      return NextResponse.json(result);
    }

    const result = await aiClient.generateCatalogueFromText(text || '');
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: 'AI failed', detail: String(e) }, { status: 500 });
  }
}
