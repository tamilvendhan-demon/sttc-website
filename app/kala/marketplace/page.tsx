"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Brand from '../components/Brand';

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products/list').then((r) => r.json()).then((j) => setProducts(j.products || []));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8"><Brand /></header>
      <main className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="panel-3d p-4 rounded">
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover rounded mb-3" />
              ) : (
                <div className="h-40 bg-gray-100 flex items-center justify-center mb-3">Image</div>
              )}
              <div className="text-lg font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.shortDescription}</div>
              <div className="text-sm text-gray-600">By {p.createdBy?.name || p.artisanId || 'Unknown'}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xl font-bold">₹{p.price || '—'}</div>
                <Link href="#" className="px-3 py-1 bg-[#155a50] text-white rounded text-sm">View</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
