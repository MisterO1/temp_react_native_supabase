// src/contexts/user-context.tsx
import { useAuth } from "@/contexts/auth-context";
import { useAppStore } from "@/store/Zustand";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: any | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, loading: authLoading } = useAuth();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUserEmail } = useAppStore();

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    setUser(session?.user ?? null);
    setUserEmail(session?.user.email)
    setLoading(false);
  }, [session, authLoading]);

  // useEffect(() => {
  //   if (user?.email) {
  //     console.log("🔐 User connecté :", user.email);
  //   }
  // }, [user]);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
