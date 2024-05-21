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
        '11' : '11px',
        '14' : '14px',
        'recipe' : '21px'
      },
      backgroundImage:{
        'hero-banner' : "url('../assets/img/header-bg.png')",
      },
      boxShadow:{
        'theme' : '0px 4px 34px 30px rgba(0, 0, 0, 0.04)'
      },
      letterSpacing:{
        'subtitle' : '1.08px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

