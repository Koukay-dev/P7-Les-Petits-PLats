/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'theme-yellow' : '#FFD15B',
        'theme-black' : '#1B1B1B',
        'theme-grey' :  '#7A7A7A'
      },
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
        'anton':['Anton', ...defaultTheme.fontFamily.sans]
      },
      borderRadius:{
        '10' : '10px',
        '11' : '11px'
      },
      backgroundImage:{
        'hero-banner' : "url('../assets/img/header-bg.png')",
      }
    },
  },
  plugins: [],
}

