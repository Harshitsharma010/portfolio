import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["Kanit", "Inter", "Arial", "sans-serif"],
      },
      colors: {
        portfolio: {
          ink: "#000000",
          muted: "#6F6F6F",
          paper: "#FFFFFF",
          night: "#07111F",
          gold: "#D9B86F",
        },
      },
      boxShadow: {
        line: "0 0 0 1px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
