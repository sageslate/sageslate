/// <reference types="@graphql-codegen/plugin-helpers" />
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

import type { CodegenConfig } from '@graphql-codegen/cli'

// eslint-disable-next-line import/no-default-export
export default {
  schema: 'apps/source/src/graphql/**/*.graphql',
  documents: 'apps/sight/src/graphql/**/*.graphql',
  generates: {
    'apps/source/src/schema': defineConfig({
      resolverGeneration: 'all',
      resolverMainFileMode: 'modules',
      typesPluginsConfig: {
        contextType: '../types/apollo.js#ApolloContext',
        maybeValue: 'T | undefined',
      },
    }),
    'apps/sight/src/graphql/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
        {
          add: {
            content: ['/// <reference types="graphql" />'].join('\n'),
          },
        },
      ],
      config: {
        maybeValue: 'T | undefined',
        vueCompositionApiImportFrom: 'vue',
        gqlImport: 'graphql-tag#gql',
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
} satisfies CodegenConfig
