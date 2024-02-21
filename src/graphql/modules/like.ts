import { builder } from "../builder"

builder.prismaObject("Like", {
  name: "Like",
  fields: (t) => ({
    term: t.relation("term"),
    termId: t.exposeID("termId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})
