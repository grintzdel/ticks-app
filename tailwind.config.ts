import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-public-sans)']
      },
      boxShadow: {
        'premium': '0px 3.07px 13px rgba(46, 94, 199, 0.8)',
      }
    },
  },
  plugins: [],
};
export default config;
