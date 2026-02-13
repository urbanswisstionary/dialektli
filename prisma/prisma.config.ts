import path from "node:path"
import { config } from "dotenv"
import { defineConfig } from "prisma/config"

config({ path: ".env.local" })

// DO NOT USE PRODUCTION DB! Only use local DB!
// process.env.VERCEL_POSTGRES_URL || process.env.POSTGRES_URL
export default defineConfig({
  schema: path.join(__dirname, "schema.prisma"),
  migrations: {
    path: path.join(__dirname, "migrations"),
  },
  datasource: {
    url: process.env.POSTGRES_URL!,
  },
})
