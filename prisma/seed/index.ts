import { PrismaClient, Role } from "@prisma/client"
import prisma from "../../src/lib/prisma"

const testUser = { email: "testemail@gmail.com", role: Role.ADMIN }
const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: testUser.email },
    update: {},
    create: testUser,
  })

  console.log("[seed test user]", { user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
