import { builder } from "../builder"

builder.prismaObject("Bookmark", {
  name: "Bookmark",
  fields: (t) => ({
    expression: t.relation("expression"),
    expressionId: t.exposeID("expressionId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})
