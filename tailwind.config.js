const colors = require('tailwindcss/colors')

module.exports = {
  // purge: [],
  purge: ['./pages/**/*.tsx', './next/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.red,
        secondary: colors.yellow,
      },
      textColor: {
        primary: colors.red,
        secondary: colors.yellow,
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
