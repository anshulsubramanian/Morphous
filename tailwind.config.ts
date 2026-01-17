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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        // Standard heading sizes
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],      // 48px - Main headings
        'h1-sm': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px - Main headings (small screens)
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],  // 36px - Subheadings
        'h2-sm': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }], // 30px - Subheadings (small screens)
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],  // 24px - Section headings
        'h3-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px - Section headings (small screens)
        // Standard text sizes
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],   // 16px - Body text
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px - Large body text
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px - Small text
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

