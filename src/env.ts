import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // Database
    POSTGRES_URL: z.url(),
    // NextAuth
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.url().optional(),
    // OAuth providers (optional — only needed when configured)
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    // Email (optional — only needed for contact/bug-report routes)
    NODEMAILER_EMAIL: z.email(),
    NODEMAILER_PASSWORD: z.string(),
    // Upstash Redis rate limiting (optional)
    UPSTASH_REDIS_REST_URL: z.url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    // Feature flags
    ENABLE_DEV_LOGIN: z.enum(["true", "false"]).optional(),
    SKIP_DB_CONNECTION: z.enum(["true", "false"]).optional(),
  },
  client: {},
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    ENABLE_DEV_LOGIN: process.env.ENABLE_DEV_LOGIN,
    SKIP_DB_CONNECTION: process.env.SKIP_DB_CONNECTION,
  },
})
