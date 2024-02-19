import prisma from "../../src/lib/prisma"
import { seedUsers } from "./users"

const main = async () => {
  await seedUsers()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
