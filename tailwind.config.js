const colors = require('tailwindcss/colors')

module.exports = {
  // purge: [],
  purge: ['./pages/**/*.tsx', './next/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.indigo
      },
      textColor: {
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
