import { NextResponse } from 'next/server';
import { generateCatalogueFromImage, isMock } from '../../../../lib/ai/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl } = body;
    if (!imageUrl) return NextResponse.json({ error: 'imageUrl required' }, { status: 400 });

    if (isMock()) {
      // Return demo quality metrics
      return NextResponse.json({
        ok: true,
        quality: {
          resolution: '1024x768',
          focusScore: 0.87,
          exposureScore: 0.92,
          compositionScore: 0.78,
          recommendations: ['Increase brightness slightly', 'Crop tighter to the product', 'Use plain background for better clarity']
        }
      });
    }

    // Non-mock: attempt to call AI image analyser for fields and derive a confidence-based quality
    const ai = await generateCatalogueFromImage(imageUrl);
    const confidence = ai.aiConfidence || 0.5;
    const quality = {
      resolution: 'unknown',
      focusScore: Math.min(1, confidence),
      exposureScore: Math.min(1, 0.8 + (confidence - 0.5) * 0.4),
      compositionScore: Math.min(1, 0.6 + (confidence - 0.5) * 0.6),
      recommendations: [] as string[],
    };
    if (confidence < 0.6) quality.recommendations.push('Retake photo with clearer lighting');
    if (confidence < 0.4) quality.recommendations.push('Use a plain background and larger framing');

    return NextResponse.json({ ok: true, quality, ai });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
