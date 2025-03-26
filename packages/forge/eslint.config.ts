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
  {
    files: ['**/__tests__/**'],
    rules: {
      'import-x/order': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
)
