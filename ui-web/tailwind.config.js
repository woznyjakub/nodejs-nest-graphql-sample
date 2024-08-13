/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "530px",
      md: "760px",
      lg: "1190px",
      xl: "1500px",
      "2xl": "1750px",
    },
    fontFamily: {
      sans: ["Example", "sans-serif"],
      serif: ["Example-serif", "serif"],
    },
    darkMode: "class",
    extend: {},
  },
  plugins: [],
};
