"use client";
import { useState } from 'react';

export default function ChatPanel() {
  const [messages, setMessages] = useState<Array<{role:string,text:string}>>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setText('');
    setLoading(true);
    try {
      // Try streaming first (server returns text/event-stream when available)
      const streamRes = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg.text, stream: true }) });

      if (streamRes.ok && streamRes.headers.get('content-type')?.includes('text/event-stream')) {
        // Read streaming response
        const reader = streamRes.body!.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';
        setMessages((m) => [...m, { role: 'assistant', text: assistantText }]);
        // We'll update the last assistant message progressively
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantText += chunk;
          setMessages((m) => {
            const copy = [...m];
            // replace last assistant message
            copy[copy.length - 1] = { role: 'assistant', text: assistantText };
            return copy;
          });
        }
      } else {
        // Fallback to regular JSON response
        const res = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg.text }) });
        const data = await res.json();
        setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Thedal is temporarily unavailable. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded p-4 bg-white max-w-2xl">
      <div className="h-64 overflow-auto mb-4 space-y-3">
        {messages.length === 0 && <div className="text-gray-500">Say hello to Thedal — your AI business assistant.</div>}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-[#155a50] text-white' : 'bg-gray-100 text-gray-800'}`}>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 border rounded p-2" placeholder="Ask Thedal (e.g. Who should buy this product?)" />
        <button onClick={send} disabled={loading} className="px-4 py-2 bg-[#c99a45] text-white rounded">{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
}
