import { builder } from "../builder"

builder.prismaObject("Flag", {
  name: "Flag",
  fields: (t) => ({
    expression: t.relation("expression"),
    expressionId: t.exposeID("expressionId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})
