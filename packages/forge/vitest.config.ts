import { defineConfig, coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: ['**/*.generated.*', ...coverageConfigDefaults.exclude],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
