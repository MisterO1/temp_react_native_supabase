// src/contexts/theme-context.tsx
import { ColorScheme, darkTheme, lightTheme } from "@/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  loading: boolean;
  colors: ColorScheme;
};

const THEME_KEY = "@app_theme";
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setThemeState] = useState<Theme>((colorScheme as Theme) ?? "light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (!mounted) return;
        if (stored === "light" || stored === "dark") setThemeState(stored);
        else if (colorScheme) setThemeState(colorScheme as Theme);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      // If user has not explicitly set theme (no stored value), follow system
      (async () => {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (!stored) {
          setThemeState((colorScheme as Theme) ?? "light");
        }
      })();
    });

    return () => {
      mounted = false;
      sub.remove();
    };
  }, [colorScheme]);

  const setTheme = async (t: Theme) => {
    setThemeState(t);
    await AsyncStorage.setItem(THEME_KEY, t);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  
  const colors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, loading, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};
