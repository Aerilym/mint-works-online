// https://www.tailwindshades.com/#color=158.57142857142856%2C16.470588235294112%2C66.66666666666667&step-up=8&step-down=11&hue-shift=0&name=summer-green&base-stop=5&v=1&overrides=e30%3D
const deed = {
  DEFAULT: '#9CB8AE',
  50: '#FFFFFF',
  100: '#FBFCFC',
  200: '#E3EBE8',
  300: '#CCDAD5',
  400: '#B4C9C1',
  500: '#9CB8AE',
  600: '#7BA193',
  700: '#5F8577',
  800: '#48645A',
  900: '#30433D',
  950: '#25332E',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        mintCard: {
          background: '#f2e9d9',
          textPrimary: '#1f3a42',
          textSecondary: '#f6eed8',
          border: '#5e5e5e',
          deed: deed,
          utility: '#f1b158',
          production: '#e17975',
          culture: '#b6c16c',
        },
      },
    },
  },
  plugins: [],
};
