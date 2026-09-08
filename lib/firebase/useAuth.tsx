"use client";
import { useEffect, useState } from 'react';
import { firebaseAuth } from './init';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = firebaseAuth || (typeof window !== 'undefined' ? getAuth() : null);
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return { user };
}
