import prisma from "../../src/lib/prisma"
import { seedExpression } from "./expressions"
import { seedUsers } from "./users"

const main = async () => {
  await seedUsers()
  await seedExpression()
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
