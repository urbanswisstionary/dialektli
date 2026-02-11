import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects"
import type PrismaTypes from "../../generated/pothos-types"
import { getDatamodel } from "../../generated/pothos-types"
import prisma from "@/lib/prisma"
import type { Session } from "next-auth"
import { DateTimeResolver } from "graphql-scalars"

export type Context = {
  session: Session | null
  locale: string
}

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    DateTime: { Input: Date; Output: Date }
  }
  Context: Context
}>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
})

builder.addScalarType("DateTime", DateTimeResolver)

builder.queryType({})
builder.mutationType({})
