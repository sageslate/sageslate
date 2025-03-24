import { base } from '@sageslate/codex'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
  base,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  globalIgnores(['**/*.generated.ts']),
)
