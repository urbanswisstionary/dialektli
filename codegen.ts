import { CodegenConfig } from "@graphql-codegen/cli"
import { printSchema } from "graphql"

import { schema } from "./src/graphql/schema"

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ["src/**/*.tsx", "src/**/*.ts", "*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
    "src/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  hooks: {
    afterOneFileWrite: ["oxfmt"],
  },
  config: {
    useTypeImports: true,
    dedupeFragments: true,
    scalars: {
      DateTime: "string",
      Json: "unknown",
    },
  },
}

export default config
