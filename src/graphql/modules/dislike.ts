import { builder } from "../builder"

builder.prismaObject("Dislike", {
  name: "Dislike",
  fields: (t) => ({
    expression: t.relation("expression", { onNull: "error" }),
    expressionId: t.exposeID("expressionId"),
    author: t.relation("author", { onNull: "error" }),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})
