"use client";

import { useRef } from "react";

export default function Home() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const openThedal = () => {
    try {
      const doc = frameRef.current?.contentDocument;
      const trigger = doc?.querySelector('[onclick*="toggleAssistant"]') as HTMLElement | null;
      if (trigger) trigger.click();
    } catch {
      // The iframe is same-origin in production; silently wait if it is still loading.
    }
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">
      <div
        style={{
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "0 18px",
          background: "#1C363D",
          color: "#FBF6EC",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.02em",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
          <span
            style={{
              width: 7,
              height: 7,
              flex: "0 0 auto",
              borderRadius: "50%",
              background: "#7BCB8B",
              boxShadow: "0 0 0 3px rgba(123,203,139,.12)",
            }}
          />
          <strong style={{ fontWeight: 700 }}>Thedal AI</strong>
          <span style={{ opacity: 0.72, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Digital business assistant for artisans
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ opacity: 0.72, whiteSpace: "nowrap" }}>Keyless AI ready</span>
          <button
            type="button"
            onClick={openThedal}
            style={{
              border: "1px solid rgba(251,246,236,.28)",
              background: "rgba(251,246,236,.08)",
              color: "#FBF6EC",
              borderRadius: 999,
              padding: "6px 11px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ✦ Open Thedal AI
          </button>
        </div>
      </div>
      <iframe
        ref={frameRef}
        src="/thedal-exact.html"
        title="Thedal AI — Artisan business assistant"
        style={{ display: "block", width: "100%", height: "calc(100vh - 42px)", border: 0 }}
        allow="microphone; camera"
      />
    </main>
  );
}
