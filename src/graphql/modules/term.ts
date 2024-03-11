import { Prisma, Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"
import { ApolloError } from "@apollo/client"
import { Language } from "./language"

builder.prismaObject("Synonym", {
  fields: (t) => ({
    synonym: t.relation("synonym", {
      description: "synonym of the parent term",
    }),
    synonymOf: t.relation("synonymOf", {
      description: "the term that the parent term is a synonym of",
    }),
  }),
})
const TermObject = builder.prismaObject("Term", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
    examples: t.relation("examples"),
    published: t.exposeBoolean("published"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    author: t.relation("author"),
    likes: t.relation("likes"),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { termId: id } }),
    }),
    likedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.like.findFirst({
          where: { termId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    dislikes: t.relation("dislikes"),
    dislikesCount: t.int({
      resolve: ({ id }) => prisma.dislike.count({ where: { termId: id } }),
    }),
    dislikedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.dislike.findFirst({
          where: { termId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    flagged: t.relation("flagged"),
    flaggedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.flag.findFirst({
          where: { termId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    cantons: t.exposeStringList("cantons"),
    language: t.expose("language", { type: Language }),
    synonymOf: t.relation("synonymOf", {
      description: "the terms that the parent term is a synonym of",
    }),
    synonyms: t.relation("synonyms", {
      description: "synonyms of the parent term",
    }),
  }),
})

const TermsWithCountType = builder.simpleObject("TermsWithCount", {
  fields: (t) => ({
    terms: t.field({ type: [TermObject], nullable: false }),
    count: t.int({ nullable: false }),
  }),
})

const TermsQueryInput = builder.inputType("TermsQueryInput", {
  fields: (t) => ({
    q: t.string(),
    offset: t.int(),
    limit: t.int(),
    canton: t.string(),
    firstChar: t.string(),
    slug: t.string(),
    language: t.field({ type: Language }),
    authorName: t.string(),
  }),
})

builder.queryFields((t) => ({
  term: t.prismaField({
    type: "Term",
    shield: allow,
    nullable: true,
    args: {
      data: t.arg({ type: TermIdInput, required: true }),
    },
    resolve: async (query, _root, { data: { termId } }, _ctx, _info) =>
      prisma.term.findUnique({ ...query, where: { id: termId } }),
  }),
  termsQuery: t.field({
    type: TermsWithCountType,
    shield: allow,
    nullable: true,
    args: { data: t.arg({ type: TermsQueryInput, required: true }) },
    resolve: async (_root, { data }) => {
      const {
        q,
        offset,
        limit,
        canton,
        firstChar,
        slug,
        language,
        authorName,
      } = data
      const termsWhere: Prisma.TermFindManyArgs = {
        where: {
          AND: [
            {
              published: true,
              cantons: canton ? { has: canton } : undefined,
              title: slug
                ? { contains: slug, mode: "insensitive" }
                : firstChar
                  ? { startsWith: firstChar, mode: "insensitive" }
                  : undefined,
              language: language ?? undefined,
              author: authorName ? { name: authorName } : undefined,
            },
            {
              OR: q
                ? [
                    { title: { contains: q, mode: "insensitive" } },
                    { content: { contains: q, mode: "insensitive" } },
                  ]
                : undefined,
            },
          ],
        },
      }
      const [terms, count] = await prisma.$transaction([
        prisma.term.findMany({
          where: termsWhere.where,
          skip: offset ?? undefined,
          take: limit ?? undefined,
          orderBy: q ? { title: "asc" } : { createdAt: "desc" },
        }),
        prisma.term.count({ where: termsWhere.where }),
      ])

      return { terms, count }
    },
  }),
  adminTerms: t.field({
    type: TermsWithCountType,
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: {},
    resolve: async (_root, _args, { session }, _info) => {
      try {
        if (!session?.user) return null

        const termsWhere: Prisma.TermFindManyArgs = {
          where: {
            authorId:
              session.user.role === Role.ADMIN ? undefined : session.user.id,
          },
        }
        const [terms, count] = await prisma.$transaction([
          prisma.term.findMany({
            where: termsWhere.where,
            orderBy: { updatedAt: "desc" },
          }),
          prisma.term.count({ where: termsWhere.where }),
        ])

        return { terms, count }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
}))

const CreateTermInput = builder.inputType("CreateTermInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string(),
    examples: t.stringList(),
    cantons: t.stringList(),
    language: t.field({ type: Language }),
    synonymId: t.string(),
  }),
})

const UpdateTermInput = builder.inputType("UpdateTermInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string(),
    content: t.string(),
    published: t.boolean(),
    cantons: t.stringList(),
  }),
})

const TermActionInput = builder.inputType("TermActionInput", {
  fields: (t) => ({
    termId: t.string({ required: true }),
    like: t.boolean(),
    dislike: t.boolean(),
    flag: t.boolean(),
  }),
})

const TermIdInput = builder.inputType("TermIdInput", {
  fields: (t) => ({
    termId: t.string({ required: true }),
  }),
})
const CreateTermExampleInput = builder.inputType("CreateTermExampleInput", {
  fields: (t) => ({
    termId: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
})

const UpdateTermExampleInput = builder.inputType("UpdateTermExampleInput", {
  fields: (t) => ({
    exampleId: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
})

const DeleteTermExampleInput = builder.inputType("DeleteTermExampleInput", {
  fields: (t) => ({
    exampleId: t.string({ required: true }),
  }),
})

builder.mutationFields((t) => ({
  createTerm: t.prismaField({
    type: "Term",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: { data: t.arg({ type: CreateTermInput, required: true }) },
    resolve: async (
      query,
      _root,
      { data: { title, content, examples, cantons, language, synonymId } },
      { session },
    ) => {
      try {
        const author = session?.user
        if (!author) throw new ApolloError({ errorMessage: "Not allowed" })
        const newTerm = await prisma.term.create({
          ...query,
          data: {
            title,
            content,
            cantons: cantons ?? [],
            examples: {
              createMany: {
                skipDuplicates: true,
                data: (examples ?? [])
                  .filter((example) => !!example.trim().length)
                  .map((content) => ({
                    content,
                    authorId: author.id,
                  })),
              },
            },
            language: language ?? undefined,
            author: { connect: { id: author?.id } },
            published: true,
          },
        })
        if (synonymId) {
          await prisma.synonym.createMany({
            data: [
              { synonymId: newTerm.id, synonymOfId: synonymId },
              { synonymId, synonymOfId: newTerm.id },
            ],
          })
        }
        return newTerm
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  updateTerm: t.prismaField({
    type: "Term",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: UpdateTermInput, required: true }) },
    resolve: async (
      query,
      _root,
      { data: { id, title, content, published, cantons } },
      { session },
      _info,
    ) => {
      try {
        if (!session?.user)
          throw new ApolloError({ errorMessage: "Not allowed" })
        const term = await prisma.term.findUnique({
          where: { id },
          select: { authorId: true },
        })
        if (
          term?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        )
          throw new ApolloError({ errorMessage: "Not allowed" })

        return prisma.term.update({
          ...query,
          where: { id },
          data: {
            title: title ?? undefined,
            content: content ?? undefined,
            published: published ?? undefined,
            cantons: cantons ? { set: cantons } : undefined,
          },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  deleteTerm: t.prismaField({
    type: "Term",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: TermIdInput, required: true }) },
    resolve: async (query, _root, { data: { termId } }, { session }) => {
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      try {
        const term = await prisma.term.findFirstOrThrow({
          where: { id: termId },
          select: { authorId: true },
        })
        if (
          term?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        )
          throw new ApolloError({ errorMessage: "Not allowed" })

        return prisma.term.delete({
          ...query,
          where: { id: termId },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  termAction: t.boolean({
    shield: permissions.isAuthenticated,
    args: {
      data: t.arg({ type: TermActionInput, required: true }),
    },
    resolve: async (_root, { data: { termId, ...data } }, { session }) => {
      try {
        if (!session?.user) return false

        const authorId = session.user.id

        const term = await prisma.term.findUnique({
          where: { id: termId },
          select: {
            likes: { where: { authorId } },
            dislikes: { where: { authorId } },
            flagged: { where: { authorId } },
          },
        })

        if (!term) throw new ApolloError({ errorMessage: "Term not found" })

        const action =
          "like" in data
            ? "like"
            : "dislike" in data
              ? "dislike"
              : "flag" in data
                ? "flag"
                : null
        const termId_authorId = { termId, authorId }

        switch (action) {
          case "like": {
            const updatedTerm = await prisma.term.update({
              where: { id: termId },
              data: term.likes.length
                ? { likes: { delete: { termId_authorId } } }
                : {
                    likes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { termId_authorId },
                      },
                    },
                    dislikes: term.dislikes.length
                      ? { delete: { termId_authorId } }
                      : undefined,
                  },
            })

            return !!updatedTerm
          }
          case "dislike": {
            const updatedTerm = await prisma.term.update({
              where: { id: termId },
              data: term.dislikes.length
                ? { dislikes: { delete: { termId_authorId } } }
                : {
                    dislikes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { termId_authorId },
                      },
                    },
                    likes: term.likes.length
                      ? { delete: { termId_authorId } }
                      : undefined,
                  },
            })
            return !!updatedTerm
          }
          case "flag": {
            const updatedTerm = await prisma.term.update({
              where: { id: termId },
              data: term.flagged.length
                ? { flagged: { delete: { termId_authorId } } }
                : {
                    flagged: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { termId_authorId },
                      },
                    },
                  },
            })
            return !!updatedTerm
          }
          default:
            return false
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
    },
  }),
  createTermExample: t.prismaField({
    type: "TermExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: CreateTermExampleInput, required: true }),
    },
    resolve: async (
      query,
      _root,
      { data: { termId, content } },
      { session },
    ) => {
      try {
        return prisma.termExample.create({
          ...query,
          data: {
            termId,
            content,
            authorId: session?.user?.id,
          },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return null
      }
    },
  }),
  updateTermExample: t.prismaField({
    type: "TermExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: UpdateTermExampleInput, required: true }),
    },
    resolve: async (query, _root, { data: { exampleId, content } }, _ctx) => {
      try {
        return prisma.termExample.update({
          ...query,
          where: { id: exampleId },
          data: {
            content,
          },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return null
      }
    },
  }),
  deleteTermExample: t.prismaField({
    type: "TermExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: DeleteTermExampleInput, required: true }),
    },
    resolve: async (query, _root, { data: { exampleId } }, _ctx) => {
      try {
        return prisma.termExample.delete({
          ...query,
          where: { id: exampleId },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return null
      }
    },
  }),
}))
