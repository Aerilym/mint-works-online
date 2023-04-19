/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mintCard: {
          background: '#f2e9d9',
          textPrimary: '#1f3a42',
          textSecondary: '#f6eed8',
          border: '#5e5e5e',
          deed: '#9cb8ae',
          utility: '#f1b158',
          production: '#e17975',
          culture: '#b6c16c',
        },
      },
    },
  },
  plugins: [],
};
