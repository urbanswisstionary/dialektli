import { race, rule } from "graphql-shield"
import prisma from "../lib/prisma"
import { Context } from "./types"
import { Role } from "../../generated/graphql"

export const isAuthenticated = rule({ cache: "contextual" })(async (
  _,
  __,
  { session }: Context,
  _info,
) => {
  return session?.user !== null
})

export const isAdmin = rule({ cache: "contextual" })(async (
  _,
  __,
  { session }: Context,
  _info,
) => {
  if (!session?.user?.email) return false
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })
  return user?.role === Role.Admin
})

export const isMe = rule({
  cache: "contextual",
})(async (_, __, { session }: Context) => {
  if (!session?.user?.email) return false

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { email: true },
  })
  return user?.email === session?.user?.email
})

export const isAdminOrMe = race(isAdmin, isMe)
