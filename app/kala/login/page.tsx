"use client";
import { useState } from 'react';
import Brand from '../components/Brand';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../../lib/firebase/init';
import { getDemoUser } from '../../../lib/firebase/mock';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function demoLogin() {
    const u = getDemoUser();
    alert('Logged in as demo user: ' + u.displayName);
    // In future: set app state / cookie
  }

  async function doLogin(e: any) {
    e.preventDefault();
    const auth = firebaseAuth || (typeof window !== 'undefined' ? getAuth() : null);
    if (!auth) {
      demoLogin();
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in');
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    }
  }

  async function google() {
    const auth = firebaseAuth || (typeof window !== 'undefined' ? getAuth() : null);
    if (!auth) { demoLogin(); return; }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Logged in with Google');
    } catch (err: any) { alert('Google login failed: ' + err.message); }
  }

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto mb-8"><Brand /></header>
      <main className="max-w-md mx-auto panel-3d p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Sign in to KALA LINK AI</h2>
        <form onSubmit={doLogin} className="space-y-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-2" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded p-2" />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#155a50] text-white rounded" type="submit">Sign in</button>
            <button type="button" onClick={google} className="px-4 py-2 border rounded">Sign in with Google</button>
          </div>
        </form>

        <div className="mt-4">
          <div className="text-sm text-gray-600">No Firebase configured? Use demo login:</div>
          <button onClick={demoLogin} className="mt-2 px-4 py-2 bg-[#c99a45] text-white rounded">Demo Login</button>
        </div>
      </main>
    </div>
  );
}
