import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://api:3000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/graphql/**/*.graphql'],
  generates: {
    './src/graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
}

export default config
