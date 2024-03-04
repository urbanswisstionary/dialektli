import SchemaBuilder from "@pothos/core"
import { Prisma, PrismaClient, Role } from "@prisma/client"
import PrismaPlugin from "@pothos/plugin-prisma"

import type PrismaTypes from "../../generated/pothos-types"
import { DateTimeResolver, JSONResolver } from "graphql-scalars"
import { Session } from "next-auth"
import ShieldPlugin from "./shield-plugin"
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects"
import { Language } from "@@/generated/graphql"
import { Locale } from "next/router"

const prisma = new PrismaClient({
  log: ["info", "warn"],
})

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    DateTime: { Input: Date; Output: Date }
    Json: { Input: unknown; Output: unknown }
    Role: { Input: Role; Output: Role }
    Language: { Input: Language; Output: Language }
  }
  Context: {
    session: Session | null
    lang: Locale
  }
}>({
  plugins: [PrismaPlugin, ShieldPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf, // Because the prisma client is loaded dynamically, we need to explicitly provide the some information about the prisma schema
    exposeDescriptions: true,
    filterConnectionTotalCount: true, // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn", // warn when not using a query parameter correctly
  },
})

builder.addScalarType("DateTime", DateTimeResolver)
builder.addScalarType("Json", JSONResolver)

builder.queryType()
builder.mutationType()
