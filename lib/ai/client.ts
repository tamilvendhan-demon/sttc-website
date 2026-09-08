const MOCK = (process.env.MOCK_AI_MODE || 'true').toLowerCase() === 'true';
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function callOpenAIChat(messages: Array<{ role: string; content: string }>) {
  if (MOCK) return { mock: true, reply: 'MOCK: chat response' };
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: OPENAI_MODEL, messages }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error('OpenAI error: ' + t);
  }

  const j = await res.json();
  const reply = j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : '';
  return { mock: false, reply, raw: j };
}

export async function streamOpenAIChat(messages: Array<{ role: string; content: string }>) {
  if (MOCK) {
    // Return a dummy ReadableStream that emits a single chunk
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: "MOCK stream response"\n\n'));
        controller.close();
      }
    });
    return { mock: true, stream };
  }

  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: OPENAI_MODEL, messages, stream: true }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error('OpenAI stream error: ' + t);
  }

  // Return the response body stream for the route to pipe directly
  return { mock: false, stream: res.body };
}

export function isMock() {
  return MOCK;
}

export async function chat(message: string, context?: string) {
  if (MOCK) {
    // Friendly canned responses for demo
    const lc = (message || '').toLowerCase();
    if (lc.includes('who') && lc.includes('sell')) return { reply: 'Home Décor stores, Eco-friendly retailers and Gift Shops. Offer wholesale samples.' };
    if (lc.includes('price') || lc.includes('how much')) return { reply: 'AI price estimate: ₹700 - ₹1100. Recommended starting price ₹899 (AI-assisted estimate).' };
    return { reply: 'I can help generate a catalogue, find markets, and suggest prices. Try: "Analyse this product"' };
  }

  const system = 'You are THEdal, an AI assistant that helps artisans create product catalogues, identify markets, and give price insights. Answer concisely and return helpful suggestions.';
  const messages = [
    { role: 'system', content: system },
    ...(context ? [{ role: 'system', content: context }] : []),
    { role: 'user', content: message },
  ];

  return callOpenAIChat(messages);
}

export async function generateCatalogueFromText(description: string) {
  if (MOCK) {
    return {
      catalogue: {
        title: 'Handcrafted Bamboo Storage Basket',
        shortDescription: 'A traditional handwoven bamboo basket crafted using sustainable natural materials.',
        detailedDescription:
          'This handcrafted bamboo basket combines traditional artisan techniques with practical modern design. Suitable for home décor, storage and eco-friendly gifting.',
      },
      category: 'Home Décor',
      material: 'Bamboo',
      tags: ['bamboo', 'handmade', 'eco-friendly'],
    };
  }

  const prompt = `Create a structured product catalogue JSON for the following artisan product description. Respond only with valid JSON matching the fields: title, shortDescription, detailedDescription, category, material, craftType, tags (array), suggestedPriceRange (min,max,currency).\n\nProduct description:\n${description}`;

  const r = await callOpenAIChat([{ role: 'system', content: 'You must output only JSON.' }, { role: 'user', content: prompt }]);
  // Attempt to parse JSON from reply
  try {
    const parsed = JSON.parse(r.reply);
    return parsed;
  } catch (e) {
    return { error: 'Failed to parse AI response', raw: r };
  }
}

export async function generateCatalogueFromImage(imageUrl: string) {
  if (MOCK) {
    return {
      catalogue: {
        title: 'Handcrafted Bamboo Storage Basket',
        shortDescription: 'A traditional handwoven bamboo basket crafted using sustainable natural materials.',
        detailedDescription:
          'This handcrafted bamboo basket combines traditional artisan techniques with practical modern design. Suitable for home décor, storage and eco-friendly gifting.',
      },
      category: 'Home Décor',
      material: 'Bamboo',
      tags: ['bamboo', 'handmade', 'eco-friendly'],
      aiConfidence: 0.92,
    };
  }

  // For image analysis we send a prompt instructing the model to fetch and analyse the image URL.
  const prompt = `You are an AI product vision assistant. Analyse the product image available at this URL and extract structured JSON with fields: productName, category, subCategory, material, craftType, colours (array), useCases (array), tags (array), aiConfidence (0-1). Image URL: ${imageUrl}. Respond only with JSON.`;

  const r = await callOpenAIChat([{ role: 'system', content: 'You are an image analysis assistant. If you cannot access the image, say so.' }, { role: 'user', content: prompt }]);
  try {
    const parsed = JSON.parse(r.reply);
    return parsed;
  } catch (e) {
    return { error: 'Failed to parse AI response', raw: r };
  }
}

export default { isMock, chat, generateCatalogueFromText, generateCatalogueFromImage, streamOpenAIChat };
