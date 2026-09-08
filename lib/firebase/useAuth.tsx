"use client";

import { useEffect, useState } from "react";

export type AuthUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
};

export function useAuth(): { user: AuthUser | null } {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("thedal-demo-user");
    if (saved) {
      try { setUser(JSON.parse(saved) as AuthUser); } catch { window.localStorage.removeItem("thedal-demo-user"); }
    }
    const sync = () => {
      const current = window.localStorage.getItem("thedal-demo-user");
      setUser(current ? JSON.parse(current) as AuthUser : null);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return { user };
}
