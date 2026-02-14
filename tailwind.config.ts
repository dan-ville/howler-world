import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        // Sampled from the official Colored Society pyramid
        gold: { DEFAULT: "#C9A84C", light: "#E2CA7A", dark: "#9A7A2E" },
        silver: { DEFAULT: "#8E9196", light: "#B8BBC2", dark: "#6A6D73" },
        "rr-white": { DEFAULT: "#E8E0D4", light: "#F5F0E8", dark: "#D0C8BC" },
        copper: { DEFAULT: "#A87744", light: "#C89868", dark: "#7D5630" },
        "rr-blue": { DEFAULT: "#3772A0", light: "#5A94BF", dark: "#25567A" },
        "rr-yellow": { DEFAULT: "#C4A030", light: "#DABB5A", dark: "#9A7D20" },
        "rr-green": { DEFAULT: "#20837A", light: "#3AA89E", dark: "#16605A" },
        "rr-violet": { DEFAULT: "#6E3082", light: "#9050A8", dark: "#4E2060" },
        "rr-orange": { DEFAULT: "#CC6D28", light: "#E08C4A", dark: "#9A5018" },
        "rr-gray": { DEFAULT: "#787880", light: "#9A9AA2", dark: "#58585E" },
        brown: { DEFAULT: "#7D3F35", light: "#A05A4E", dark: "#5C2D24" },
        obsidian: { DEFAULT: "#141420", light: "#2D2D44", dark: "#0A0A12" },
        "rr-pink": { DEFAULT: "#C98090", light: "#DCA0AD", dark: "#A06070" },
        red: { DEFAULT: "#943030", light: "#B84848", dark: "#6E2020" },
        "mars-red": { DEFAULT: "#C0392B", light: "#E74C3C", dark: "#922B21" },
      },
    },
  },
  plugins: [],
};

export default config;
