import { Prisma } from "@prisma/client"
import prisma from "../../src/lib/prisma"

const SEED_USERS: Prisma.UserCreateArgs["data"][] = process.env.SEED_USERS
  ? JSON.parse(process.env.SEED_USERS)
  : []

export const seedUsers = async () => {
  let usersCount = 0
  for (const user of SEED_USERS) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
    usersCount++
    console.log("[seed user]", { createdUser })
  }
  console.log(`[seed users]: ${usersCount} users created`)
}
