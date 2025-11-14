// src/app/_layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Slot, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { UserProvider } from "@/contexts/user-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootInner() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const prepare = async () => {
      // brief wait to show splash nicely
      await new Promise((r) => setTimeout(r, 500));
      if (!mounted) return;
      setReady(true);
      await SplashScreen.hideAsync();
    };
    prepare();
    return () => {
      mounted = false;
    };
  }, []);

  // still initializing auth
  if (!ready || loading) return null;

  // redirect logic
  // if no session and not on /auth -> redirect to /auth
  if (!session && segments[0] !== "auth") {
    return <Redirect href="/auth" />;
  }

  // if there is session and currently on /auth -> go to tabs/home
  if (session && segments[0] === "auth") {
    return <Redirect href="/(tab)/home" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
              <RootInner />
            </QueryClientProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
