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

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      select: { role: true },
    })
    .then((user) => user?.role === Role.Admin)
})

export const isMe = rule({
  cache: "strict",
  fragment: "fragment UserId on User { id }",
})(({ id }, _, { session }: Context) => {
  return id === session?.user?.id
})

export const isAdminOrMe = race(isAdmin, isMe)
