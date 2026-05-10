export const THEME_STORAGE_KEY = "saya-theme";

export type ThemeMode = "dark" | "light";

export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function writeStoredTheme(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export function applyThemeToDocument(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode === "light" ? "light" : "dark";
}
