import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { schema } from "@/graphql/schema"
import type { Context } from "@/graphql/builder"
import { getServerSession } from "next-auth"
import type { NextRequest } from "next/server"
import { authOptions } from "@@/auth"

const server = new ApolloServer<Context>({
  schema,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    return {
      session,
      locale: "de",
    }
  },
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
