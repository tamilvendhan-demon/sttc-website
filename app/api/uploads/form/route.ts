import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await (req as any).formData();
    const file = form.get('file') as any;
    if (!file || !file.name) return NextResponse.json({ error: 'file required' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // If Firebase Service Account + Storage bucket configured, upload there
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '';
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '';
    if (projectId && serviceAccount && storageBucket) {
      try {
        // dynamic require
        const admin = require('firebase-admin');
        if (!admin.apps.length) {
          const cred = typeof serviceAccount === 'string' ? JSON.parse(serviceAccount) : serviceAccount;
          admin.initializeApp({ credential: admin.credential.cert(cred), storageBucket });
        }
        const bucket = admin.storage().bucket();
        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const fileRef = bucket.file(safeName);
        await fileRef.save(buffer, { contentType: file.type });
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${safeName}`;
        return NextResponse.json({ ok: true, url: publicUrl, firebase: true });
      } catch (err) {
        console.error('firebase upload error', err);
        // fall back to local
      }
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const outPath = path.join(uploadsDir, safeName);
    fs.writeFileSync(outPath, buffer);
    const url = `/uploads/${safeName}`;
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
