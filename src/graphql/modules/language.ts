import { Language as PrismaLanguage } from "@prisma/client"
import { builder } from "../builder"

export const Language = builder.enumType(PrismaLanguage, {
  name: "Language",
})
