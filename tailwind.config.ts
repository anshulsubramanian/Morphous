import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "matte-black": "#0F0F0F",
        "warm-white": "#F5F2ED",
        "soft-beige": "#D8C7B5",
        "stone-taupe": "#B8A899",
        "warm-gray": "#7B756E",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.3em",
        editorial: "0.15em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        reveal: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
