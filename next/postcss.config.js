const tailwindConfig = require('./tailwind.config')

module.exports = {
  plugins: {
    tailwindcss: tailwindConfig,
    autoprefixer: {},
    'postcss-preset-env': {},
  },
}
