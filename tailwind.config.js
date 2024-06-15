/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3034",
        secondary: {
          DEFAULT: "#f7b302",
          100: "#fce823",
          200: "#25a8cf",
          300: "#fbbf21",
          400: "#fd84e3",
          500: "#95a7e8",
          600: "#af73e6",
        },
        white: {
          DEFAULT: "#f3ebea",
          100: "#d9cdcb",
          200: "#ebdedc",
        },
        gray: {
          100: "#CDCDE0",
          200: "#6b6661",
        },
      },
      fontFamily: {
        pthin: ["CabinetGrotesk-Thin", "sans-serif"],
        pextralight: ["CabinetGrotesk-Extralight", "sans-serif"],
        plight: ["CabinetGrotesk-Light", "sans-serif"],
        pregular: ["CabinetGrotesk-Regular", "sans-serif"],
        pmedium: ["CabinetGrotesk-Medium", "sans-serif"],
        pbold: ["CabinetGrotesk-Bold", "sans-serif"],
        pextrabold: ["CabinetGrotesk-Extrabold", "sans-serif"],
        pblack: ["CabinetGrotesk-Black", "sans-serif"],
        pvariable: ["CabinetGrotesk-Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
