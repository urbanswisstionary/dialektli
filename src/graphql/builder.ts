import type { Session } from "next-auth"

import SchemaBuilder from "@pothos/core"
import ErrorsPlugin from "@pothos/plugin-errors"
import PrismaPlugin from "@pothos/plugin-prisma"
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects"
import ZodPlugin from "@pothos/plugin-zod"
import { DateTimeResolver } from "graphql-scalars"

import prisma from "@/lib/prisma"

import type PrismaTypes from "../../generated/pothos-types"

import { getDatamodel } from "../../generated/pothos-types"

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
  DefaultFieldNullability: false
}>({
  plugins: [ErrorsPlugin, ZodPlugin, PrismaPlugin, SimpleObjectsPlugin],
  defaultFieldNullability: false,
  errors: {
    defaultTypes: [Error],
  },
  zod: {
    validationError: (zodError) => zodError,
  },
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
})

builder.addScalarType("DateTime", DateTimeResolver)

// ─── Base error interface ─────────────────────────────────────────────────────
export const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
})

builder.objectType(Error, {
  name: "BaseError",
  interfaces: [ErrorInterface],
})

// ─── Zod validation error ─────────────────────────────────────────────────────
import { ZodError } from "zod"

export const ZodFieldError = builder
  .objectRef<{ message: string; path: string[] }>("ZodFieldError")
  .implement({
    fields: (t) => ({
      message: t.exposeString("message"),
      path: t.exposeStringList("path"),
    }),
  })

export class ValidationError extends Error {
  public issues: { message: string; path: string[] }[]

  constructor(error: ZodError) {
    super("Validation error")
    this.name = "ValidationError"
    this.issues = error.issues.map((e) => ({
      message: e.message,
      path: e.path.map(String),
    }))
  }
}

builder.objectType(ValidationError, {
  name: "ValidationError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    issues: t.field({
      type: [ZodFieldError],
      resolve: (err) => err.issues,
    }),
  }),
})

builder.queryType({})
builder.mutationType({})
