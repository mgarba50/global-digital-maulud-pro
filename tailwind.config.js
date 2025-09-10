/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emeraldDeep: "#0a1a12",
        emerald: "#0f5132",
        gold: "#C8A24A"
      }
    },
  },
  plugins: [],
};
