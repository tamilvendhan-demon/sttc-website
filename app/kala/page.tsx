import Brand from "./components/Brand";
import Link from "next/link";

export default function KalaLanding() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-[#f6f0de] to-white">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-12">
        <Brand size={56} />
        <nav className="flex gap-4">
          <Link href="/kala/thedal" className="px-4 py-2 bg-[#155a50] text-white rounded">Try Thedal</Link>
          <Link href="/kala/marketplace" className="px-4 py-2 border border-[#d8c892] rounded">Explore Marketplace</Link>
        </nav>
      </header>

      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Turn Your Craft Into Opportunity</h1>
        <p className="text-lg text-gray-700 mb-8">AI-powered cataloguing and market discovery designed to help artisans reach the right buyers.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="panel-3d p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">How it works</h3>
            <ol className="list-decimal list-inside text-left space-y-2">
              <li>Upload a photo or speak your product details.</li>
              <li>Thedal analyses and generates a smart catalogue.</li>
              <li>Discover market matches and reach buyers.</li>
            </ol>
          </div>

          <div className="panel-3d p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Try the Demo</h3>
            <p className="text-sm text-gray-700 mb-4">Use Demo Mode to run a full SIH presentation flow without an OpenAI key.</p>
            <Link href="/kala/thedal" className="inline-block px-5 py-3 rounded bg-[#c99a45] text-white">Try AI Demo</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
