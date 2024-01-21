/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@sageslate/standards'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.app.json',
      './tsconfig.node.json',
      './tsconfig.vitest.json',
      './e2e/tsconfig.json'
    ],
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'import/no-unresolved': [
      2,
      {
        ignore: ['vue-router/auto']
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.app.json', './tsconfig.node.json', './tsconfig.vitest.json']
      }
    }
  }
}
