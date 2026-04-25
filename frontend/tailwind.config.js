/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          border: '#2e2e2e',
        },
        brand: {
          green: '#00b852',
          red: '#ff4a4a',
          blue: '#2962ff'
        }
      }
    },
  },
  plugins: [],
}
