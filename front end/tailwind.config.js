/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      spacing: {
        'fl': '100%',
        'hf': '50%',
        'qr': '25%'
      },
      colors: {
        'tahiti': "red"
      }
    },
  },
  plugins: [],
}

