export default function Home() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#7BCB8B",
              boxShadow: "0 0 0 3px rgba(123,203,139,.12)",
            }}
          />
          <strong style={{ fontWeight: 700 }}>Thedal AI</strong>
          <span style={{ opacity: 0.72 }}>Digital business assistant for artisans</span>
        </div>
        <span style={{ opacity: 0.72, whiteSpace: "nowrap" }}>AI services connected securely</span>
      </div>
      <iframe
        src="/thedal-exact.html"
        title="KALA LINK AI — Thedal"
        style={{ display: "block", width: "100%", height: "calc(100vh - 42px)", border: 0 }}
        allow="microphone; camera"
      />
    </main>
  );
}
