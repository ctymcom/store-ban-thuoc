const tailwindConfig = require('./tailwind.config')

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: tailwindConfig,
    autoprefixer: {},
    'postcss-preset-env': {},
  },
}
