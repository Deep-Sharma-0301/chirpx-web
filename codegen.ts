
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://d2t6f6rfgd2p81.cloudfront.net/graphql", //take all the schemas from here
  documents: "**/*.{tsx,ts}",  // watch over all the typescripts and tsx files in this folder
  generates: {
    "gql/": {
      preset: "client", // generate all the typescript for frontend queries in this particular folder
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
