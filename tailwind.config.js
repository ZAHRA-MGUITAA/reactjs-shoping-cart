/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "black-gray": "#1B1A20",
        "black-checkout" : "#0C0B10"
      }
    },
  },
  plugins: [],
}

