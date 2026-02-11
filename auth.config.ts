import type { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { Role } from "@prisma/client"
import prisma from "@/lib/prisma"

const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

if (process.env.NODE_ENV === "development") {
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
