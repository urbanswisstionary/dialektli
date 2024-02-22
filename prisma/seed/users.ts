import { Prisma } from "@prisma/client"
import prisma from "../../src/lib/prisma"

export const anonymourUser: Prisma.UserCreateArgs["data"] = {
  email: "anonymous@swisstionary.ch",
  role: "USER",
  name: "Anonymous",
  country: "CH",
}

export const seedUsers = async () => {
  const createdUser = await prisma.user.upsert({
    where: { email: anonymourUser.email },
    update: {},
    create: anonymourUser,
  })

  console.log("[seed user]", { createdUser })
}
