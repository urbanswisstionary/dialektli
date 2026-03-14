import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

import { env } from "@/env"

declare global {
  var prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  // For codegen/build-time schema generation where no DB connection is needed
  if (env.SKIP_DB_CONNECTION === "true") {
    const adapter = new PrismaPg({
      connectionString: "postgres://dummy:dummy@localhost:5432/dummy",
    })
    return new PrismaClient({ adapter })
  }

  // For runtime: use adapter with actual database connection
  if (!env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is required")
  }
  const adapter = new PrismaPg({ connectionString: env.POSTGRES_URL })
  return new PrismaClient({ adapter, log: ["info"] })
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient()
} else {
  if (!global.prisma) global.prisma = createPrismaClient()
  prisma = global.prisma
}

export type { PrismaClient }
export default prisma
