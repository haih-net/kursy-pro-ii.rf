import type { CodegenConfig } from '@graphql-codegen/cli'
import { printSchema } from 'graphql'
import { schema } from './server/schema'
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: 'app/Custom/gql/src/*.graphql',
  generates: {
    'app/Custom/gql/generated.ts': {
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
        fetcher: { func: './fetcher#fetchGraphql' },
        exposeMutationKeys: true,
      },
    },
  },
}
export default config
