"use client";
import { useState } from 'react';
import { useAuth } from '../../lib/firebase/useAuth';
import Link from 'next/link';

export default function ProductEditor({ initial }: { initial: any }) {
  const [product, setProduct] = useState<any>({ ...(initial || {}) });
  const { user } = useAuth();

  function update<K extends string>(key: K, value: any) {
    setProduct((p: any) => ({ ...p, [key]: value }));
  }

  return (
    <div className="space-y-4">
      <div className="panel-3d p-4 rounded">
        <label className="block text-sm font-semibold">Product Title</label>
        <input value={product.title || ''} onChange={(e) => update('title', e.target.value)} className="w-full border rounded p-2 mt-1" />
        <label className="block text-sm font-semibold mt-3">Short Description</label>
        <input value={product.shortDescription || ''} onChange={(e) => update('shortDescription', e.target.value)} className="w-full border rounded p-2 mt-1" />
        <label className="block text-sm font-semibold mt-3">Detailed Description</label>
        <textarea value={product.detailedDescription || ''} onChange={(e) => update('detailedDescription', e.target.value)} className="w-full border rounded p-2 mt-1" rows={6} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="panel-3d p-4 rounded">
          <label className="block text-sm font-semibold">Category</label>
          <input value={product.category || ''} onChange={(e) => update('category', e.target.value)} className="w-full border rounded p-2 mt-1" />
        </div>
        <div className="panel-3d p-4 rounded">
          <label className="block text-sm font-semibold">Material</label>
          <input value={product.material || ''} onChange={(e) => update('material', e.target.value)} className="w-full border rounded p-2 mt-1" />
        </div>
      </div>

      <div className="flex gap-3">
        {product.imageUrl && (
          <div className="mr-4">
            <img src={product.imageUrl} alt="product" className="w-24 h-24 object-cover rounded" />
          </div>
        )}
        <button className="px-4 py-2 bg-[#155a50] text-white rounded">Save Draft</button>
        <button className="px-4 py-2 border rounded">Regenerate</button>
        <button onClick={async ()=>{
          if (!user) { alert('Please sign in to publish.'); return; }
          try {
            const payload = { ...product, createdBy: { uid: user.uid, email: user.email || null, name: user.displayName || null } };
            const res = await fetch('/api/products/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product: payload }) });
            const j = await res.json();
            if (res.ok) alert('Product saved: ' + j.id);
            else alert('Save failed');
          } catch (e) { alert('Save failed'); }
        }} className="px-4 py-2 bg-[#c99a45] text-white rounded">Publish Product</button>
        {!user && (
          <Link href="/kala/login" className="ml-3 text-sm text-blue-600">Sign in to publish</Link>
        )}
      </div>
    </div>
  );
}
