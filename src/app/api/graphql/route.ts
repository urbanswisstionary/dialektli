import { authOptions } from "@@/auth"
import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import type { Context } from "@/graphql/builder"

import { schema } from "@/graphql/schema"

const isProd = process.env.NODE_ENV === "production"

const server = new ApolloServer<Context>({
  schema,
  introspection: !isProd,
  plugins: [
    isProd
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (_req: NextRequest) => {
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
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      analytics: true,
    })
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1"
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { errors: [{ message: "Too many requests" }] },
        { status: 429 },
      )
    }
  }
  return handler(request)
}
