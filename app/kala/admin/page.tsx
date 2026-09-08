"use client";

import { useEffect, useState } from 'react';
import Brand from '../components/Brand';

export default function AdminDashboard() {
  const [data, setData] = useState<any>({ products: [], artisans: [] });
  const firebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  useEffect(() => {
    fetch('/api/products/list').then((r) => r.json()).then((j) => setData({ products: j.products || [], artisans: j.artisans || [] }));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8"><Brand /></header>
      <main className="max-w-6xl mx-auto">
        {!firebaseConfigured && (
          <div className="mb-4 p-3 rounded bg-yellow-50 border border-yellow-200 text-sm">Firebase not configured — admin actions operate on demo data only.</div>
        )}
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="panel-3d p-4 rounded">
            <div className="text-sm text-gray-600">Total Artisans</div>
            <div className="text-2xl font-bold">{data.artisans.length}</div>
          </div>
          <div className="panel-3d p-4 rounded">
            <div className="text-sm text-gray-600">Total Products</div>
            <div className="text-2xl font-bold">{data.products.length}</div>
          </div>
          <div className="panel-3d p-4 rounded">
            <div className="text-sm text-gray-600">Pending Verifications</div>
            <div className="text-2xl font-bold">{data.artisans.filter((a:any)=>a.verificationStatus!="Verified").length}</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Recent Products</h3>
        <div className="space-y-3">
          {data.products.map((p:any)=> (
            <div key={p.id} className="panel-3d p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">By {p.artisanId} • ₹{p.price}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={async ()=>{ await fetch('/api/admin/product/moderate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,action:'approve'})}); const res=await fetch('/api/products/list'); const j=await res.json(); setData({products:j.products,artisans:j.artisans}); }} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={async ()=>{ await fetch('/api/admin/product/moderate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id,action:'reject'})}); const res=await fetch('/api/products/list'); const j=await res.json(); setData({products:j.products,artisans:j.artisans}); }} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Artisans</h3>
        <div className="space-y-3">
          {data.artisans.map((a:any) => (
            <div key={a.id} className="panel-3d p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-gray-600">{a.craftSpecialization} • {a.location}</div>
              </div>
              <div className="flex gap-2">
                <div className="text-sm px-2 py-1 border rounded">{a.verificationStatus}</div>
                <button onClick={async ()=>{ await fetch('/api/admin/artisan/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:a.id,action:'verify'})}); const res=await fetch('/api/products/list'); const j=await res.json(); setData({products:j.products,artisans:j.artisans}); }} className="px-3 py-1 bg-green-600 text-white rounded">Verify</button>
                <button onClick={async ()=>{ await fetch('/api/admin/artisan/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:a.id,action:'reject'})}); const res=await fetch('/api/products/list'); const j=await res.json(); setData({products:j.products,artisans:j.artisans}); }} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
