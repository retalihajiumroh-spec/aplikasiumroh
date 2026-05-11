"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyThemeToDocument, readStoredTheme, writeStoredTheme, type ThemeMode } from "@/lib/theme/theme-storage";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    const initial = readStoredTheme();
    setModeState(initial);
    applyThemeToDocument(initial);
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    writeStoredTheme(m);
    applyThemeToDocument(m);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      writeStoredTheme(next);
      applyThemeToDocument(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
