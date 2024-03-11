import { builder } from "../builder"

builder.prismaObject("TermExample", {
  name: "TermExample",
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    term: t.relation("term"),
    termId: t.exposeID("termId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId", { nullable: true }),
    content: t.exposeString("content"),
    cantons: t.exposeStringList("cantons"),
  }),
})
