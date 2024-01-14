/// <reference types="@graphql-codegen/plugin-helpers" />

import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

import type { CodegenConfig } from '@graphql-codegen/cli'

// eslint-disable-next-line import/no-default-export
export default {
  schema: 'src/graphql/*.graphql',
  generates: {
    'src/schema': defineConfig({
      resolverGeneration: 'all',
    }),
  },
} satisfies CodegenConfig
