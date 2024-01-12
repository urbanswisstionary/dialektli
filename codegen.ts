import { CodegenConfig } from "@graphql-codegen/cli"
import { schema } from "./src/graphql/schema"
import { printSchema } from "graphql"

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ["src/**/*.tsx", "src/**/*.ts", "*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
    "generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
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
