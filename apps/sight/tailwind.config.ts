import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

import type { Config } from 'tailwindcss'

// eslint-disable-next-line import/no-default-export
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/images/bg.webp')",
      },
      textShadow: {
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['"Playfair Display"', 'serif'],
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
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
} satisfies Config
