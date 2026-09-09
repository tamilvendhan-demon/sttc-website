import { headers } from "next/headers";

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <main style={{ margin: 0, width: "100vw", minHeight: "100vh", overflow: "hidden" }}>
      <iframe
        src="/thedal-ai-protocol.html"
        title="Thedal AI — Kala Link AI"
        nonce={nonce}
        style={{ display: "block", width: "100%", height: "100vh", border: 0 }}
      />
    </main>
  );
}
