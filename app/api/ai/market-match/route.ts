import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();
    // Return canned market matches for demo
    const matches = [
      { segment: 'Home Décor Stores', score: 0.94, reason: 'Natural bamboo + decorative design + handmade appearance', recommendedAction: 'Offer catalogue + wholesale pricing + sample order' },
      { segment: 'Eco-Friendly Retailers', score: 0.91, reason: 'Sustainable material and eco positioning', recommendedAction: 'Highlight eco credentials + certifications' },
      { segment: 'Gift Shops', score: 0.83, reason: 'Compact, giftable product', recommendedAction: 'Offer gift packaging options' }
    ];

    return NextResponse.json({ productId, marketMatches: matches });
  } catch (e) {
    return NextResponse.json({ error: 'market-match failed' }, { status: 500 });
  }
}
