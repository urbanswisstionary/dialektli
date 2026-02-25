import { Role } from "@prisma/client"
import { DefaultUser } from "next-auth"

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: DefaultUser & {
      id: string
      role: Role
    }
  }
  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    role: Role
  }
}
