/// <reference types="@graphql-codegen/plugin-helpers" />
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

import type { CodegenConfig } from '@graphql-codegen/cli'

// eslint-disable-next-line import/no-default-export
export default {
  schema: 'apps/source/src/realm/graphql/**/*.graphql',
  documents: 'apps/sight/src/graphql/realm/**/*.graphql',
  generates: {
    'apps/source/src/realm/schema': defineConfig({
      resolverGeneration: 'all',
      resolverMainFileMode: 'modules',
      typesPluginsConfig: {
        contextType: '../types/apollo.js#ApolloContext',
        maybeValue: 'T | undefined',
      },
    }),
    'apps/sight/src/graphql/realm/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
        {
          add: {
            content: [
              '/// <reference types="graphql" />',
              "import { strictInject, RealmIdInjectionKey } from '@/atoms/utils/strictInject'",
            ].join('\n'),
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
