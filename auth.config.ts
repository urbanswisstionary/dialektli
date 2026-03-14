import type { NextAuthOptions } from "next-auth"

import { Role } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { env } from "@/env"
import prisma from "@/lib/prisma"

const providers = []

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

if (process.env.NODE_ENV === "development" && env.ENABLE_DEV_LOGIN === "true") {
  providers.push(
    Credentials({
      name: "Development Test User",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password"
        ) {
          const user = await prisma.user.upsert({
            where: { email: "test@example.com" },
            update: {},
            create: {
              email: "test@example.com",
              name: `test-user-${Date.now()}`,
              role: Role.USER,
            },
          })
          return user
        }
        return null
      },
    }),
  )
}

export default {
  providers,
  pages: {
    signIn: "/de/auth/signin",
  },
} satisfies NextAuthOptions
