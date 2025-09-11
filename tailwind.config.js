/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5faf8",
          100: "#e9f6f1",
          200: "#cbe9de",
          300: "#9ed3c1",
          400: "#3fb593",
          500: "#10a37f",
          600: "#0b7d62",
          700: "#096251",
          800: "#074e42",
          900: "#063e36",
        },
        ink: {
          50: "#f8fafc",
          100: "#eef2f6",
          200: "#e3e8ef",
          300: "#c8d0da",
          400: "#90a3b3",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1f2937",
          900: "#0f172a",
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
