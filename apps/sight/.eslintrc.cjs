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
  rules: {},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts']
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  }
}
