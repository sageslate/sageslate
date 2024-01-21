/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

// eslint-disable-next-line import/no-default-export
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/images/bg.webp')",
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      primary: {
        ...colors.sky,
        975: '#041825',
      },
      secondary: colors.lime,
    },
  },
  plugins: [],
}
