import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
// eslint-disable-next-line import-x/default
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import { configs as tsEslintConfigs } from 'typescript-eslint'

import type { Linter } from 'eslint'

export const rulesConfig = defineConfig({
  rules: {
    'no-undef': 'off',
    'import-x/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'import-x/no-default-export': 'off',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-mutable-exports': 'error',
    'import-x/no-deprecated': 'off',
    'import-x/namespace': 'off',
    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import-x/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': ['off'],
    'unicorn/import-style': [
      'error',
      {
        styles: {
          'node:path': {
            named: true,
          },
        },
      },
    ],
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-global-this': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
})

export const tsRulesConfig = defineConfig({
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
        },
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
})

export const base = defineConfig([
  eslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended as Linter.Config,
  eslintPluginImportX.flatConfigs.typescript as Linter.Config,
  tsEslintConfigs.recommendedTypeChecked as Linter.Config,
  tsRulesConfig,
  rulesConfig,
  eslintConfigPrettier,
])

export const vue = defineConfig(...pluginVue.configs['flat/recommended'], {
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/prefer-import-from-vue': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineModel', 'defineSlots'],
      },
    ],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/match-component-import-name': 'error',
    'vue/next-tick-style': ['error', 'promise'],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/prefer-define-options': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/require-macro-variable-name': [
      'error',
      {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs',
      },
    ],
    'vue/static-class-names-order': 'off',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/no-undef-components': 'error',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'SLOT',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_DYNAMIC',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
  },
})
