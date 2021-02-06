const colors = require('tailwindcss/colors')

function getSemanticColors(color) {
  return {
    light: color[100],
    DEFAULT: color[500],
    dark: color[600]
  }
}

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EBF8EC',
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
      fontSize: {
        10: '10px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        emerge: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(4px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        } 
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      emerge: 'emerge 0.3s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-in-out',
    },
    rotate:{
      '-135': '-135deg',
    }
  },
  variants: {
    extend: {
      // borderColor: ['focus'],
      fill: ['hover', 'focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      textColor:['checked']
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
