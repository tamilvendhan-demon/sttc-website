import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const p = path.join(process.cwd(), 'data', 'demoData.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(raw);
    const q = (query || '').toLowerCase();
    const products = (json.products || []).filter((prod: any) => {
      if (!q) return true;
      if (prod.tags && prod.tags.join(' ').toLowerCase().includes(q)) return true;
      if (prod.title && prod.title.toLowerCase().includes(q)) return true;
      // numeric price queries like "under 1000"
      const m = q.match(/under\s*(\d+)/);
      if (m) return prod.price <= Number(m[1]);
      return false;
    });

    return NextResponse.json({ results: products });
  } catch (e) {
    return NextResponse.json({ results: [] });
  }
}
