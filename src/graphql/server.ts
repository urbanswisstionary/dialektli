import { ApolloServer } from "@apollo/server"
import { Context } from "./types"
import { schema } from "./schema"

const server = new ApolloServer<Context>({
  schema,
  introspection: true,
})

export default server
