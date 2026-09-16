import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EAF2E8",
        paperDim: "#F1F3EF",
        ink: "#14231C",
        inkSoft: "#4B5B52",
        green: "#1F6E4A",
        greenDeep: "#0F3D28",
        gold: "#D9A441",
        earth: "#8A5A2B",
        line: "#DCE3DA",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-ibm-plex)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;