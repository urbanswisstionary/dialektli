import { builder } from "../builder"

builder.prismaObject("ExpressionExample", {
  name: "ExpressionExample",
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    expression: t.relation("expression"),
    expressionId: t.exposeID("expressionId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId", { nullable: true }),
    definition: t.exposeString("definition"),
    cantons: t.exposeStringList("cantons"),
  }),
})
