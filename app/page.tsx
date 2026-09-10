"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#f5f7fa]">
      <iframe
        src="/thedal-dashboard/index.html"
        title="Thedal AI artisan marketplace dashboard"
        style={{ display: "block", width: "100%", height: "100vh", minHeight: "700px", border: 0 }}
        allow="microphone; camera"
      />
    </main>
  );
}
