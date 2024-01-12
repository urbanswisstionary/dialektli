import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production")
  prisma = new PrismaClient({ log: ["info"] })
else {
  if (!global.prisma) global.prisma = new PrismaClient({ log: ["info"] })
  prisma = global.prisma
}
export type { PrismaClient }
export default prisma
