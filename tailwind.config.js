module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/component/**/*.tsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'xs': '.8125rem'
      },
      colors: {
        primary: 'rgb(46, 164, 79)',
        secondary: '#ecc94b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
