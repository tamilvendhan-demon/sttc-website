import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '';
    if (projectId && serviceAccount) {
      try {
        const admin = eval('require')('firebase-admin');
        if (!admin.apps.length) {
          const cred = typeof serviceAccount === 'string' ? JSON.parse(serviceAccount) : serviceAccount;
          admin.initializeApp({ credential: admin.credential.cert(cred), projectId });
        }
        const db = admin.firestore();
        const productsSnap = await db.collection('products').orderBy('createdAt','desc').limit(100).get();
        const products = productsSnap.docs.map((d:any)=>({ id: d.id, ...d.data() }));
        const artisansSnap = await db.collection('artisans').get();
        const artisans = artisansSnap.docs.map((d:any)=>({ id: d.id, ...d.data() }));
        return NextResponse.json({ products, artisans });
      } catch (err) {
        console.error('firebase-admin list error', err);
      }
    }

    const p = path.join(process.cwd(), 'data', 'demoData.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(raw);
    return NextResponse.json({ products: json.products || [], artisans: json.artisans || [] });
  } catch (e) {
    return NextResponse.json({ products: [], artisans: [] });
  }
}
