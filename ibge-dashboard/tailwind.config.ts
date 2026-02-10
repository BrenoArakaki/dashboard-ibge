import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
  extend: {
  colors: {
    TESTE_CONFIG: "#ff00ff",
  },
},
  },
  plugins: [],
} satisfies Config;
