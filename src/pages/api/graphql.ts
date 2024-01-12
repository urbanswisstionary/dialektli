import { startServerAndCreateNextHandler } from "@as-integrations/next"

import server from "@/graphql/server"
import { createContext } from "@/graphql/schema"

export default startServerAndCreateNextHandler(server, {
  context: createContext,
})
