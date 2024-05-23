/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '0px', 'max': '600px'},
      'md': {'min': '640px', 'max': '976px'},
      'lg': {'min': '1024px', 'max': '2279px'},
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

