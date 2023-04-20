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

const utility = {
  DEFAULT: '#F1B158',
  50: '#FFFFFF',
  100: '#FEF7EF',
  200: '#FAE6C9',
  300: '#F7D4A3',
  400: '#F4C37E',
  500: '#F1B158',
  600: '#ED9924',
  700: '#C87B11',
  800: '#945B0C',
  900: '#613C08',
  950: '#472C06',
};

const production = {
  DEFAULT: '#E17975',
  50: '#FFFFFF',
  100: '#FEFBFB',
  200: '#F7DBDA',
  300: '#F0BAB8',
  400: '#E89A97',
  500: '#E17975',
  600: '#D74C47',
  700: '#BD2F29',
  800: '#8F231F',
  900: '#611815',
  950: '#4A1210',
};

const culture = {
  DEFAULT: '#B6C16C',
  50: '#F6F7ED',
  100: '#EFF1DF',
  200: '#E1E5C2',
  300: '#D3D9A5',
  400: '#C4CD89',
  500: '#B6C16C',
  600: '#9FAC49',
  700: '#7B8538',
  800: '#565D27',
  900: '#323617',
  950: '#20220E',
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
    colors: {
      cyan: deed,
      orange: utility,
      red: production,
      lime: culture,
    },
    extend: {
      colors: {
        mintCard: {
          background: '#f2e9d9',
          textPrimary: '#1f3a42',
          textSecondary: '#f6eed8',
          border: '#5e5e5e',
          deed,
          utility,
          production,
          culture,
        },
      },
    },
  },
  plugins: [],
};
