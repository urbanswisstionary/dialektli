import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import pg from "pg"

declare global {
  var prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  // For codegen/build-time schema generation where no DB connection is needed
  if (process.env.SKIP_DB_CONNECTION === "true") {
    // Prisma 7 requires adapter, but we don't need actual DB for codegen
    // Create a dummy adapter that won't be used
    const dummyPool = new pg.Pool({
      connectionString: "postgres://dummy:dummy@localhost:5432/dummy",
    })
    const adapter = new PrismaPg(dummyPool)
    return new PrismaClient({ adapter })
  }

  // For runtime: use adapter with actual database connection
  if (process.env.POSTGRES_URL) {
    const pool = new pg.Pool({ connectionString: process.env.POSTGRES_URL })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter, log: ["info"] })
  }

  throw new Error("POSTGRES_URL environment variable is required")
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
