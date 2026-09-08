import { NextResponse } from 'next/server';
import aiClient from '../../../../lib/ai/client';

// For backward compatibility the demo page calls GET. We support GET (mock) and POST(imageUrl) for real analysis.
export async function GET() {
  if (aiClient.isMock()) {
    const mock = {
      productName: 'Handwoven Bamboo Storage Basket',
      category: 'Home Décor',
      subCategory: 'Storage',
      material: 'Bamboo',
      craftType: 'Handwoven',
      colours: ['Natural Brown'],
      useCases: ['Home Storage', 'Home Décor', 'Gift'],
      tags: ['bamboo basket','handmade','eco-friendly','storage'],
      aiConfidence: 0.92,
      catalogue: {
        title: 'Handcrafted Bamboo Storage Basket',
        shortDescription: 'A traditional handwoven bamboo basket crafted using sustainable natural materials.',
        detailedDescription: 'This handcrafted bamboo basket combines traditional artisan techniques with practical modern design. Suitable for home décor, storage and eco-friendly gifting.'
      },
      priceEstimate: { min: 700, max: 1100, currency: 'INR', recommended: 899 },
      marketMatches: [
        { segment: 'Home Décor Stores', score: 0.94, reason: 'Natural bamboo + decorative design + handmade appearance' },
        { segment: 'Eco-Friendly Retailers', score: 0.91, reason: 'Sustainable material and eco positioning' },
        { segment: 'Gift Shops', score: 0.83, reason: 'Attractive as a gift and small-batch' }
      ],
    };

    return NextResponse.json(mock);
  }

  return NextResponse.json({ error: 'Use POST with { imageUrl } for real analysis' }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) return NextResponse.json({ error: 'imageUrl required' }, { status: 400 });
    const r = await aiClient.generateCatalogueFromImage(imageUrl);
    return NextResponse.json(r);
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
