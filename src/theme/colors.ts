export const lightTheme = {
  background: "#ffffff",
  surface: "#f5f5f5",
  primary: "#2563eb", // bleu
  primaryDark: "#1d4ed8",
  secondary: "#dc2626", // rouge
  secondaryDark: "#b91c1c",
  text: "#1f2937",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  error: "#ef4444",
};

export const darkTheme = {
  background: "#0f172a",
  surface: "#1e293b",
  primary: "#3b82f6", // bleu plus clair
  primaryDark: "#2563eb",
  secondary: "#f87171", // rouge plus clair
  secondaryDark: "#dc2626",
  text: "#f1f5f9",
  textSecondary: "#cbd5e1",
  border: "#334155",
  error: "#fca5a5",
};

export type ColorScheme = typeof lightTheme;
