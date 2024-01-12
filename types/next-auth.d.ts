import { Role } from "@prisma/client"
import NextAuth, { DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string
      role: Role
    }
  }
  interface User extends DefaultUser {
    role: Role
  }
}
