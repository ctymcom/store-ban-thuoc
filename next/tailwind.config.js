const colors = require('tailwindcss/colors')

function getSemanticColors(color) {
  return {
    light: color[100],
    DEFAULT: color[500],
    dark: color[600]
  }
}

module.exports = {
  // purge: [],
  purge: ['./pages/**/*.tsx', './next/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#DCFFDF',
          DEFAULT: '#42B54A',
          dark: '#27972F',
        },
        accent: {
          light: '#FFF5DC',
          DEFAULT: '#F9B514',
          dark: '#E4A511',
        },
        info: getSemanticColors(colors.blue),
        success: getSemanticColors(colors.green),
        warning: getSemanticColors(colors.yellow),
        danger: getSemanticColors(colors.red),
      },
      // textColor: theme => theme('colors'),
      // textColor: {
      //  'success': '#42B54A',
      //  'danger': '#e3342f',
      //  'text-color': '#282828',
      // },
      // backgroundColor: theme => ({
      //   ...theme('colors'),
      //   'btn-warning': '#F9B514',
      //   'btn-green': '#42B54A',
      //   'btn-success': '#42B54A',
      //   'btn-danger': '#e3342f',
      // }),
      // borderColor: theme => ({
      //   ...theme('colors'),
      //   'success': '#42B54A',
      //  })
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
