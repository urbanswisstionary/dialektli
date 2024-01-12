import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import type { NextAuthOptions, SessionOptions } from "next-auth"

import { encode, decode } from "next-auth/jwt"
import type { Adapter } from "next-auth/adapters"

import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

import bcrypt from "bcrypt"
import { randomUUID } from "crypto"

import Cookies from "cookies"

const {
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  RECAPTCHA_SECRETE_KEY = "",
} = process.env

const verifyRecaptcha = async (token: string) => {
  const secretKey = RECAPTCHA_SECRETE_KEY
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  return await fetch(verificationUrl, { method: "POST" })
}

const getAdapter = (_req: NextApiRequest, _res: NextApiResponse): Adapter => ({
  ...PrismaAdapter(prisma),
  async getSessionAndUser(sessionToken) {
    const userAndSession = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            image: true,
            role: true,
          },
        },
      },
    })
    if (!userAndSession) return null
    const { user, ...session } = userAndSession
    return { user, session }
  },
})

const session: SessionOptions = {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
  generateSessionToken: async () => randomUUID(),
}

export const authOptions = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const adapter = getAdapter(req, res)
  const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          name: { label: "Name", type: "name", placeholder: "Name" },
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: { label: "Password", type: "password" },
          recaptchaToken: { label: "Recaptcha", type: "recaptcha" },
        },
        async authorize(credentials, _authReq) {
          if (!credentials) return null

          try {
            const recaptchaToken = credentials.recaptchaToken
            const recaptcharesponse = await verifyRecaptcha(recaptchaToken)
            const recaptchaData = await recaptcharesponse.json()

            if (!recaptchaData.success || recaptchaData.score < 0.5)
              throw new Error("Recaptcha failed")
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            res.json({
              status: "error",
              message: "Something went wrong, please try again.",
            })
          }
          const { name, email, password } = credentials

          let user = await prisma.user.findUnique({ where: { email } })
          if (!user && !!name && !!email && !!password) {
            // sign up
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await prisma.user.create({
              data: { email, password: hashedPassword },
            })
          } else {
            user = await prisma.user.findUnique({ where: { email } })
            if (
              !user ||
              !user.password ||
              !bcrypt.compareSync(password, user.password)
            )
              return null
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        },
      }),
    ],
    adapter,
    callbacks: {
      async session({ session, user }) {
        if (session.user) {
          session.user.id = user.id
          session.user.role = user.role
        }
        return session
      },
      async signIn({ user }) {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth?.includes("credentials") &&
          req.method === "POST"
        ) {
          if (user && "id" in user) {
            const sessionToken = randomUUID()
            const sessionExpiry = new Date(Date.now() + session.maxAge! * 1000)

            if (!adapter.createSession) return false
            await adapter.createSession({
              sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            })

            const cookies = new Cookies(req, res)
            cookies.set("next-auth.session-token", sessionToken, {
              expires: sessionExpiry,
            })
          }
        }

        return true
      },
    },
    jwt: {
      maxAge: session.maxAge,
      async encode(params) {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth?.includes("credentials") &&
          req.method === "POST"
        ) {
          const cookies = new Cookies(req, res)
          const cookie = cookies.get("next-auth.session-token")

          if (cookie) return cookie
          else return ""
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode(params)
      },
      async decode(params) {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth?.includes("credentials") &&
          req.method === "POST"
        ) {
          return null
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return decode(params)
      },
    },
    pages: {
      signIn: "/account/signin",
    },
    session,
    cookies: {
      sessionToken: {
        name: "next-auth.session-token",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
        },
      },
    },
    debug: process.env.NODE_ENV === "development",
  }
  return authOptions
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return NextAuth(req, res, await authOptions(req, res))
}
