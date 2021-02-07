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
      maxWidth: {
        '4xs': '8rem',
        '3xs': '12rem',
        '2xs': '16rem',
      },
      minWidth: {
        'none': 'none',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.75rem',
        7: '2rem',
        8: '2.25rem',
        9: '2.75rem',
        10: '2.5rem',
        11: '3rem',
        12: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        '4xs': '8rem',
        '3xs': '12rem',
        '2xs': '16rem',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
      minHeight: {
        'none': 'none',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.75rem',
        7: '2rem',
        8: '2.25rem',
        9: '2.75rem',
        10: '2.5rem',
        11: '3rem',
        12: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        '4xs': '8rem',
        '3xs': '12rem',
        '2xs': '16rem',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'min': 'min-content',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
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
      pointerEvents: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled'],
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
