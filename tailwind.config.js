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
      textColor: theme => theme('colors'),
      textColor: {
       'success': '#42B54A',
       'danger': '#e3342f',
       'text-color': '#282828',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'btn-warning': '#F9B514',
        'btn-green': '#42B54A',
        'btn-success': '#42B54A',
        'btn-danger': '#e3342f',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        'success': '#42B54A',
       })
    },
    
  },
  variants: {
    extend: {
      // borderColor: ['focus'],
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
  // corePlugins: {
  //   // ...
  //   borderColor: false,
  // }
}
