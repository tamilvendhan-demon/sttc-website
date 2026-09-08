"use client";
import { useState, useRef } from 'react';

export default function VoiceInput({ onTranscription }:{ onTranscription:(text:string)=>void }){
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function start() {
    setStatus(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setStatus('Uploading...');
        try {
          const form = new FormData();
          form.append('audio', blob, 'voice.webm');
          const res = await fetch('/api/stt', { method: 'POST', body: form });
          const j = await res.json();
          if (res.ok && j.transcript) {
            setStatus('Transcribed');
            onTranscription(j.transcript);
          } else {
            setStatus('Transcription failed');
          }
        } catch (e) { setStatus('Upload failed'); }
      };
      mr.start();
      setRecording(true);
      setStatus('Recording...');
    } catch (e) {
      setStatus('Microphone access denied');
    }
  }

  function stop() {
    const mr = mediaRef.current;
    if (!mr) return;
    mr.stop();
    setRecording(false);
  }

  return (
    <div className="panel-3d p-3 rounded">
      <div className="flex items-center gap-3">
        <button onClick={()=> recording ? stop() : start()} className={`px-3 py-2 rounded ${recording? 'bg-red-500 text-white':'bg-[#155a50] text-white'}`}>
          {recording ? 'Stop' : 'Record Voice'}
        </button>
        <div className="text-sm text-gray-700">{status}</div>
      </div>
      <div className="text-xs text-gray-500 mt-2">Tip: describe your product out loud — the AI will transcribe it for catalogue generation.</div>
    </div>
  );
}
