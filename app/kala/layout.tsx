import './globals.css';
import Brand from './components/Brand';
import Link from 'next/link';

export default function KalaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Brand />
          <nav className="flex items-center gap-4">
            <Link href="/kala/marketplace" className="text-sm">Marketplace</Link>
            <Link href="/kala/products/new" className="text-sm">Sell</Link>
            <Link href="/kala/admin" className="text-sm">Admin</Link>
            <Link href="/kala/login" className="text-sm">Login</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="max-w-6xl mx-auto text-center p-6 text-sm text-gray-500">KALA LINK AI — From Craft to Market</footer>
    </div>
  );
}
