/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'pale-yellow' : '#FFD15B'
      },
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
        'anton':['Anton', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}

