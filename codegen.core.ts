import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'packages/forge/src/yoga/core/schema/**/schema.graphql',
  generates: {
    'packages/forge/src/yoga/core/schema': defineConfig({
      emitLegacyCommonJSImports: false,
      // The following config is designed to work with GraphQL Yoga's File uploads feature
      // https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
      scalarsOverrides: {
        File: { type: 'File' },
      },
      resolverGeneration: {
        query: '*',
        mutation: '*',
        subscription: '*',
        scalar: '!*.File',
        object: '*',
        union: '',
        interface: '',
        enum: '*',
      },
    }),
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
}
export default config
