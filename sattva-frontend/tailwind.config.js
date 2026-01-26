/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calmYellow: "#FFEAA7",
        calmMint: "#A8E6CF",
        calmBlue: "#74B9FF",
        calmLavender: "#DCC6E0",
        calmNavy: "#2C3A47",
        calmCoral: "#FAB1A0",
         sattvaBrown: "#5C3A2E",
      sattvaCream: "#F5EFE6",
      sattvaBeige: "#E8D8C3",
      sattvaDark: "#3E2723",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
