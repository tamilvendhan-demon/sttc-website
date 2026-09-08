"use client";
import { useState } from 'react';
import Brand from '../../components/Brand';
import ProductEditor from '../ProductEditor';
import VoiceInput from '../../components/VoiceInput';

export default function NewProductPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [qualityResult, setQualityResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [descriptionText, setDescriptionText] = useState<string>('');

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function generateFromText() {
    setLoading(true);
    try {
      setError(null);
      const res = await fetch('/api/ai/catalogue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inputType: 'text', description: descriptionText }) });
      const data = await res.json();
      setAiResult(data);
    } catch (e:any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setLoading(true);
    try {
      setError(null);
      let imageUrl: string | null = null;
      if (file) {
        const allowed = ['image/png', 'image/jpeg', 'image/webp'];
        if (!allowed.includes(file.type)) throw new Error('Only PNG/JPEG/WEBP allowed');
        if (file.size > 5 * 1024 * 1024) throw new Error('File must be under 5MB');

        // upload with progress using XMLHttpRequest to /api/uploads/form
        const form = new FormData();
        form.append('file', file);
        imageUrl = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/api/uploads/form');
          xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
          };
          xhr.onload = () => {
            try {
              const j = JSON.parse(xhr.responseText);
              if (j.ok && j.url) resolve(j.url);
              else reject(new Error(j.error || 'Upload failed'));
            } catch (e) { reject(e); }
          };
          xhr.onerror = () => reject(new Error('Upload failed'));
          xhr.send(form);
        });

        // request photo-quality analysis
        try {
          const q = await fetch('/api/ai/photo-quality', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl }) });
          const qj = await q.json();
          setQualityResult(qj);
        } catch (e) { /* ignore */ }
      }

      const res = await fetch('/api/ai/catalogue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inputType: 'image', imageUrl }) });
      const data = await res.json();
      // include imageUrl in aiResult for editor
      data.imageUrl = imageUrl;
      setAiResult(data);
    } catch (e) {
      setError(e?.message || String(e));
      setAiResult({ error: 'AI error' });
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  }

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-8"><Brand /></header>
      <main className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Create Your Product Listing</h2>

        <div className="panel-3d p-6 rounded">
          <label className="block text-sm font-semibold mb-2">Upload Product Image</label>
          <div className="border-dashed border-2 border-gray-300 p-6 rounded text-center">
            <input type="file" accept="image/*" onChange={onFileChange} />
            <div className="mt-4">
              <button onClick={generate} disabled={loading} className="px-4 py-2 bg-[#155a50] text-white rounded">{loading ? 'AI is understanding your craft…' : '✨ Generate with AI'}</button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Or describe your product (voice or text)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <VoiceInput onTranscription={(t)=> setDescriptionText(t)} />
              </div>
              <div>
                <textarea value={descriptionText} onChange={(e)=>setDescriptionText(e.target.value)} rows={5} className="w-full border rounded p-2" placeholder="Or type a quick description..." />
                <div className="mt-2">
                  <button onClick={generateFromText} disabled={loading || !descriptionText} className="px-3 py-2 bg-[#155a50] text-white rounded">Generate from description</button>
                </div>
              </div>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <img src={preview} alt="preview" className="max-w-xs rounded shadow" />
            </div>
          )}
        </div>

        {aiResult && (
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Generated Catalogue</h3>
            <ProductEditor initial={{ title: aiResult.catalogue?.title, shortDescription: aiResult.catalogue?.shortDescription, detailedDescription: aiResult.catalogue?.detailedDescription, category: aiResult.category, material: aiResult.material, imageUrl: aiResult.imageUrl }} />
            {qualityResult && qualityResult.quality && (
              <div className="mt-3 panel-3d p-3 rounded">
                <strong>Photo Quality</strong>
                <div>Focus: {Math.round((qualityResult.quality.focusScore||0)*100)}%</div>
                <div>Exposure: {Math.round((qualityResult.quality.exposureScore||0)*100)}%</div>
                <div>Composition: {Math.round((qualityResult.quality.compositionScore||0)*100)}%</div>
                <div className="mt-2">Recommendations:
                  <ul className="list-disc pl-6">{(qualityResult.quality.recommendations||[]).map((r:string,i:number)=>(<li key={i}>{r}</li>))}</ul>
                </div>
              </div>
            )}
            {error && <div className="text-red-600 mt-2">{error}</div>}
            {uploadProgress !== null && <div className="mt-2">Uploading: {uploadProgress}%</div>}
          </div>
        )}
      </main>
    </div>
  );
}
