import { ApolloServer } from "@apollo/server"

import { schema } from "./schema"
import { Context } from "./types"

const server = new ApolloServer<Context>({
  schema,
  introspection: true,
})

export default server
