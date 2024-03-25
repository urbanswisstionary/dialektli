import { ExpressionGender as PrismaExpressionGender } from "@prisma/client"
import { builder } from "../builder"

export const ExpressionGender = builder.enumType(PrismaExpressionGender, {
  name: "ExpressionGender",
})
