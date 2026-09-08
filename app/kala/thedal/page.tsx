"use client";
import { useState } from "react";
import Brand from "../components/Brand";
import ChatPanel from "./ChatPanel";

export default function ThedalDemo() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  async function runDemo() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/analyse-image');
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setAnalysis({ error: 'AI demo failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <Brand />
        <div className="text-sm text-gray-600">Demo Mode</div>
      </header>

      <main className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Thedal — AI Demo Flow</h2>
        <p className="mb-4 text-gray-700">Click the button to run a canned product image analysis and catalogue generation.</p>
        <button onClick={runDemo} disabled={loading} className="px-4 py-2 bg-[#155a50] text-white rounded mb-6">{loading ? 'Analysing…' : 'Run AI Demo'}</button>

        {analysis && (
          <section className="space-y-4">
            <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(analysis, null, 2)}</pre>
          </section>
        )}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Talk to Thedal</h3>
          <ChatPanel />
        </div>
      </main>
    </div>
  );
}
