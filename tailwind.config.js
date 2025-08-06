/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: "'var(--font-cormorant-garamond)",
        sans: "var(--font-sans)",
      },
    },
  },
  plugins: [],
  future: {
    useOkLCHColors: false, // 👈 important
  },
};
