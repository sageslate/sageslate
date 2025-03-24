import { defineConfig } from 'eslint/config'

import { base } from './dist/lib.js'

export default defineConfig(base, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
