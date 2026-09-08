"use client";

export type AuthUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
};

export function useAuth(): { user: AuthUser | null } {
  return { user: null };
}
