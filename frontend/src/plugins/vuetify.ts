import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

const STORAGE_KEY = "theme";

// Resolve initial theme safely
let defaultTheme: "appLight" | "appDark" = "appLight";
try {
  const saved =
    typeof localStorage !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null;
  if (saved === "appLight" || saved === "appDark") {
    defaultTheme = saved as "appLight" | "appDark";
  } else if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    defaultTheme = "appDark";
  }
} catch {
  // ignore storage errors
}


const vuetify = createVuetify({
  icons: {
    /* unchanged */
  },
  theme: {
    defaultTheme, // you already set this via localStorage/system
    themes: {
      appLight: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: "#FF6F3D",
          secondary: "#FFB648",
          accent: "#E8577D",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
          // optional helpers
          ink: "#2F3A47",
          muted: "#F8FAFC",
        },
      },
      appDark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#1E1E1E",
          primary: "#FF6F3D",
          secondary: "#FFB648",
          accent: "#E8577D",
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
          ink: "#E5E7EB",
          muted: "#0B0B0B",
        },
      },
    },
  },
});

export default vuetify;
