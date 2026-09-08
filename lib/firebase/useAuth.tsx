"use client";
import { useEffect, useState } from 'react';
import { firebaseAuth } from './init';

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (firebaseAuth) setUser(firebaseAuth.currentUser);
  }, []);

  return { user };
}
