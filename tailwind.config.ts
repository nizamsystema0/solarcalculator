import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16232C",
        inkSoft: "#4A5A63",
        paper: "#F5F8FB",
        paperDim: "#E9EFF3",
        sun: "#E8A33D",
        sunDeep: "#C1583A",
        panel: "#1F4E5F",
        panelDeep: "#123240",
        savings: "#3E7A54",
        line: "#D8E1E8",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-ibm-plex)", "sans-serif"],
      },
      backgroundImage: {
        "sun-arc":
          "radial-gradient(circle at 50% 120%, rgba(232,163,61,0.35), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;