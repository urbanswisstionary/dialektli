import { ExpressionType as PrismaExpressionType } from "@prisma/client"
import { builder } from "../builder"

export const ExpressionType = builder.enumType(PrismaExpressionType, {
  name: "ExpressionType",
})
