import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { product } = await req.json();
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '';

    // If Firebase service account present, try saving to Firestore using firebase-admin
    if (projectId && serviceAccount) {
      try {
        // dynamic import to avoid hard dependency when not configured
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const admin = eval('require')('firebase-admin');
        if (!admin.apps.length) {
          const cred = typeof serviceAccount === 'string' ? JSON.parse(serviceAccount) : serviceAccount;
          admin.initializeApp({ credential: admin.credential.cert(cred), projectId });
        }
        const db = admin.firestore();
        const docRef = await db.collection('products').add({ ...product, status: 'Published', createdAt: new Date() });
        return NextResponse.json({ ok: true, id: docRef.id, firebase: true });
      } catch (err) {
        // If admin init fails, fall back to demo file
        console.error('firebase-admin error', err);
      }
    }

    // Demo fallback: write into demoData.json
    const p = path.join(process.cwd(), 'data', 'demoData.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(raw);
    const id = 'product-' + Date.now();
    const toSave = { ...product, id, status: 'Published', createdAt: new Date().toISOString() };
    json.products = json.products || [];
    json.products.unshift(toSave);
    fs.writeFileSync(p, JSON.stringify(json, null, 2), 'utf-8');
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
