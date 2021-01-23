const colors = require('tailwindcss/colors')

module.exports = {
  // purge: [],
  purge: ['./pages/**/*.tsx', './next/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.yellow,
      },
      textColor: {
        primary: colors.green,
        secondary: colors.yellow,
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}
