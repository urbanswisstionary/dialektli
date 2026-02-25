import { Prisma, Role } from "@prisma/client"
import { GraphQLError } from "graphql"
import { z } from "zod"

import prisma from "@/lib/prisma"

import { builder, ValidationError } from "../builder"
import { randomPick } from "../utils/randomPick"
import { ExpressionGender } from "./expressionGender"
import { ExpressionType } from "./expressionType"
import { Language } from "./language"

builder.prismaObject("Synonym", {
  fields: (t) => ({
    synonym: t.relation("synonym", {
      description: "synonym of the parent expression",
    }),
    synonymOf: t.relation("synonymOf", {
      description: "the expression that the parent expression is a synonym of",
    }),
  }),
})

const Expression = builder.prismaObject("Expression", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    definition: t.exposeString("definition", { nullable: true }),
    examples: t.relation("examples", {}),
    published: t.exposeBoolean("published"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    author: t.relation("author", { nullable: true }),
    likes: t.relation("likes", {}),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { expressionId: id } }),
    }),
    likedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.like.findFirst({
          where: { expressionId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    dislikes: t.relation("dislikes", {}),
    dislikesCount: t.int({
      resolve: ({ id }) =>
        prisma.dislike.count({ where: { expressionId: id } }),
    }),
    dislikedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.dislike.findFirst({
          where: { expressionId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    flagged: t.relation("flagged", {}),
    flaggedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.flag.findFirst({
          where: { expressionId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    bookmarks: t.relation("bookmarks", {}),
    bookmarkCount: t.int({
      resolve: ({ id }) =>
        prisma.bookmark.count({ where: { expressionId: id } }),
    }),
    bookmarkedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.bookmark.findFirst({
          where: { expressionId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    cantons: t.exposeStringList("cantons"),
    language: t.expose("language", { type: Language }),
    synonymOf: t.relation("synonymOf", {
      description: "the expressions that the parent expression is a synonym of",
    }),
    synonyms: t.relation("synonyms", {
      description: "synonyms of the parent expression",
    }),
    gender: t.expose("gender", { type: ExpressionGender, nullable: true }),
    type: t.expose("type", { type: ExpressionType, nullable: true }),
    semanticGroups: t.relation("semanticGroups", {}),
  }),
})

const ExpressionsWithCountType = builder.simpleObject("ExpressionsWithCount", {
  fields: (t) => ({
    expressions: t.field({ type: [Expression], nullable: false }),
    count: t.int({ nullable: false }),
  }),
})

const ExpressionsQueryInput = builder.inputType("ExpressionsQueryInput", {
  fields: (t) => ({
    q: t.string(),
    offset: t.int(),
    limit: t.int(),
    canton: t.string(),
    firstChar: t.string(),
    language: t.field({ type: Language }),
    authorName: t.string(),
    sortByPopularity: t.boolean(),
  }),
})

const ExpressionIdInput = builder.inputType("ExpressionIdInput", {
  fields: (t) => ({
    expressionId: t.string({ required: true }),
  }),
})

builder.queryFields((t) => ({
  expression: t.prismaField({
    type: "Expression",
    nullable: true,
    args: {
      data: t.arg({ type: ExpressionIdInput, required: true }),
    },
    resolve: async (query, _root, { data: { expressionId } }, _ctx, _info) =>
      prisma.expression.findUnique({ ...query, where: { id: expressionId } }),
  }),
  expressionsQuery: t.field({
    type: ExpressionsWithCountType,
    nullable: true,
    args: { data: t.arg({ type: ExpressionsQueryInput, required: true }) },
    resolve: async (_root, { data }) => {
      const {
        q,
        offset,
        limit,
        canton,
        firstChar,
        language,
        authorName,
        sortByPopularity,
      } = data
      const expressionsWhere: Prisma.ExpressionFindManyArgs = {
        where: {
          AND: [
            {
              published: true,
              cantons: canton ? { has: canton } : undefined,
              title: firstChar
                ? { startsWith: firstChar, mode: "insensitive" }
                : undefined,
              language: language ?? undefined,
              author: authorName ? { name: authorName } : undefined,
            },
            {
              OR: q
                ? [
                    { title: { contains: q, mode: "insensitive" } },
                    { definition: { contains: q, mode: "insensitive" } },
                  ]
                : undefined,
            },
          ],
        },
      }

      const orderBy = randomPick([
        "id",
        "title",
        "definition",
        "cantons",
        "gender",
        "type",
        "authorId",
        "updatedAt",
        "createdAt",
      ] as (keyof Prisma.ExpressionOrderByWithRelationInput)[])

      const [expressions, count] = await prisma.$transaction([
        prisma.expression.findMany({
          where: expressionsWhere.where,
          skip: offset ?? undefined,
          take: limit ?? undefined,
          orderBy: sortByPopularity
            ? { likes: { _count: "desc" } }
            : q
              ? { title: "asc" }
              : { [orderBy]: randomPick([`asc`, `desc`]) },
        }),
        prisma.expression.count({ where: expressionsWhere.where }),
      ])

      return { expressions, count }
    },
  }),
  adminExpressions: t.field({
    type: ExpressionsWithCountType,
    nullable: true,
    args: {},
    resolve: async (_root, _args, { session }, _info) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      if (session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }

      try {
        const expressionsWhere: Prisma.ExpressionFindManyArgs = {
          where: {},
        }
        const [expressions, count] = await prisma.$transaction([
          prisma.expression.findMany({
            where: expressionsWhere.where,
            orderBy: { updatedAt: "desc" },
          }),
          prisma.expression.count({ where: expressionsWhere.where }),
        ])

        return { expressions, count }
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.error(error)
        return null
      }
    },
  }),
  myBookmarks: t.field({
    type: ExpressionsWithCountType,
    nullable: true,
    resolve: async (_root, _args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        const bookmarks = await prisma.bookmark.findMany({
          where: { authorId: session.user.id },
          orderBy: { createdAt: "desc" },
          include: { expression: true },
        })

        const expressions = bookmarks.map((b) => b.expression)
        return { expressions, count: expressions.length }
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.error(error)
        return null
      }
    },
  }),
}))

const CreateExpressionInput = builder.inputType("CreateExpressionInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    definition: t.string(),
    cantons: t.stringList(),
    language: t.field({ type: Language }),
    synonymId: t.string(),
    example: t.string(),
    exampleCantons: t.stringList(),
    gender: t.field({ type: ExpressionGender }),
    type: t.field({ type: ExpressionType }),
  }),
})

const UpdateExpressionInput = builder.inputType("UpdateExpressionInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string(),
    definition: t.string(),
    published: t.boolean(),
    cantons: t.stringList(),
    gender: t.field({ type: ExpressionGender }),
    type: t.field({ type: ExpressionType }),
  }),
})

const ExpressionActionInput = builder.inputType("ExpressionActionInput", {
  fields: (t) => ({
    expressionId: t.string({ required: true }),
    like: t.boolean(),
    dislike: t.boolean(),
    flag: t.boolean(),
    bookmark: t.boolean(),
  }),
})

const CreateExpressionExampleInput = builder.inputType(
  "CreateExpressionExampleInput",
  {
    fields: (t) => ({
      expressionId: t.string({ required: true }),
      definition: t.string({ required: true }),
      cantons: t.stringList(),
    }),
  },
)

const UpdateExpressionExampleInput = builder.inputType(
  "UpdateExpressionExampleInput",
  {
    fields: (t) => ({
      exampleId: t.string({ required: true }),
      definition: t.string({ required: true }),
      cantons: t.stringList(),
    }),
  },
)

const DeleteExpressionExampleInput = builder.inputType(
  "DeleteExpressionExampleInput",
  {
    fields: (t) => ({
      exampleId: t.string({ required: true }),
    }),
  },
)

builder.mutationFields((t) => ({
  createExpression: t.prismaField({
    type: "Expression",
    errors: {
      types: [Error, ValidationError],
    },
    args: {
      data: t.arg({
        type: CreateExpressionInput,
        required: true,
        validate: {
          schema: z.object({
            title: z.string().min(2).max(100),
            definition: z.string().min(2).max(2000).optional().nullable(),
          }),
        },
      }),
    },
    resolve: async (
      query,
      _root,
      {
        data: {
          title,
          definition,
          cantons,
          language,
          synonymId,
          example,
          exampleCantons,
          type,
          gender,
        },
      },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        const author = session.user
        const newExpression = await prisma.expression.create({
          ...query,
          data: {
            title,
            definition,
            cantons: cantons ?? [],
            language: language ?? undefined,
            author: { connect: { id: author?.id } },
            published: true,
            examples: example
              ? {
                  create: {
                    definition: example,
                    authorId: author.id,
                    cantons: exampleCantons ?? undefined,
                  },
                }
              : undefined,
            type,
            gender,
          },
        })
        if (synonymId) {
          await prisma.synonym.createMany({
            data: [
              { synonymId: newExpression.id, synonymOfId: synonymId },
              { synonymId, synonymOfId: newExpression.id },
            ],
          })
        }
        return newExpression
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.error("Failed to create expression:", error)
        throw new Error(
          error instanceof Error
            ? error.message
            : "Failed to create expression",
        )
      }
    },
  }),
  updateExpression: t.prismaField({
    type: "Expression",
    errors: {
      types: [Error, ValidationError],
    },
    args: {
      data: t.arg({
        type: UpdateExpressionInput,
        required: true,
        validate: {
          schema: z.object({
            id: z.string(),
            title: z.string().min(2).max(100).optional().nullable(),
            definition: z.string().min(2).max(2000).optional().nullable(),
            published: z.boolean().optional().nullable(),
            cantons: z.array(z.string()).optional().nullable(),
            gender: z.any().optional().nullable(),
            type: z.any().optional().nullable(),
          }),
        },
      }),
    },
    resolve: async (
      query,
      _root,
      { data: { id, title, definition, published, cantons, type, gender } },
      { session },
      _info,
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        const expression = await prisma.expression.findUnique({
          where: { id },
          select: { authorId: true },
        })
        if (
          expression?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        ) {
          throw new GraphQLError("Not authorized")
        }

        return prisma.expression.update({
          ...query,
          where: { id },
          data: {
            title: title ?? undefined,
            definition: definition ?? undefined,
            published: published ?? undefined,
            cantons: cantons ? { set: cantons } : undefined,
            type,
            gender,
          },
        })
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        // oxlint-disable-next-line no-console
        console.error(error)
        throw new Error("Failed to update expression")
      }
    },
  }),
  deleteExpression: t.prismaField({
    type: "Expression",
    errors: {
      types: [Error],
    },
    args: { data: t.arg({ type: ExpressionIdInput, required: true }) },
    resolve: async (query, _root, { data: { expressionId } }, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        const expression = await prisma.expression.findFirstOrThrow({
          where: { id: expressionId },
          select: { authorId: true },
        })
        if (
          expression?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        ) {
          throw new GraphQLError("Not authorized")
        }

        return prisma.expression.delete({
          ...query,
          where: { id: expressionId },
        })
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        // oxlint-disable-next-line no-console
        console.error(error)
        throw new Error("Failed to delete expression")
      }
    },
  }),
  expressionAction: t.boolean({
    errors: {
      types: [Error],
    },
    args: {
      data: t.arg({ type: ExpressionActionInput, required: true }),
    },
    resolve: async (
      _root,
      { data: { expressionId, ...data } },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        const authorId = session.user.id

        const expression = await prisma.expression.findUnique({
          where: { id: expressionId },
          select: {
            authorId: true,
            likes: { where: { authorId } },
            dislikes: { where: { authorId } },
            flagged: { where: { authorId } },
            bookmarks: { where: { authorId } },
          },
        })

        if (!expression) {
          throw new Error("Expression not found")
        }

        const action =
          "like" in data
            ? "like"
            : "dislike" in data
              ? "dislike"
              : "flag" in data
                ? "flag"
                : "bookmark" in data
                  ? "bookmark"
                  : null

        if (
          (action === "like" || action === "dislike") &&
          expression.authorId === authorId
        ) {
          throw new Error("Cannot vote on your own expression")
        }
        const expressionId_authorId = { expressionId, authorId }

        switch (action) {
          case "like": {
            const updatedExpression = await prisma.expression.update({
              where: { id: expressionId },
              data: expression.likes.length
                ? { likes: { delete: { expressionId_authorId } } }
                : {
                    likes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { expressionId_authorId },
                      },
                    },
                    dislikes: expression.dislikes.length
                      ? { delete: { expressionId_authorId } }
                      : undefined,
                  },
            })

            return !!updatedExpression
          }
          case "dislike": {
            const updatedExpression = await prisma.expression.update({
              where: { id: expressionId },
              data: expression.dislikes.length
                ? { dislikes: { delete: { expressionId_authorId } } }
                : {
                    dislikes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { expressionId_authorId },
                      },
                    },
                    likes: expression.likes.length
                      ? { delete: { expressionId_authorId } }
                      : undefined,
                  },
            })
            return !!updatedExpression
          }
          case "flag": {
            const updatedExpression = await prisma.expression.update({
              where: { id: expressionId },
              data: expression.flagged.length
                ? { flagged: { delete: { expressionId_authorId } } }
                : {
                    flagged: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { expressionId_authorId },
                      },
                    },
                  },
            })
            return !!updatedExpression
          }
          case "bookmark": {
            const updatedExpression = await prisma.expression.update({
              where: { id: expressionId },
              data: expression.bookmarks.length
                ? { bookmarks: { delete: { expressionId_authorId } } }
                : {
                    bookmarks: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { expressionId_authorId },
                      },
                    },
                  },
            })
            return !!updatedExpression
          }
          default:
            return false
        }
      } catch (error) {
        if (error instanceof GraphQLError) throw error
        // oxlint-disable-next-line no-console
        console.log(error)
        throw new Error("Expression action failed")
      }
    },
  }),
  createExpressionExample: t.prismaField({
    type: "ExpressionExample",
    errors: {
      types: [Error, ValidationError],
    },
    args: {
      data: t.arg({
        type: CreateExpressionExampleInput,
        required: true,
        validate: {
          schema: z.object({
            expressionId: z.string(),
            definition: z.string().min(2).max(2000),
            cantons: z.array(z.string()).optional().nullable(),
          }),
        },
      }),
    },
    resolve: async (
      query,
      _root,
      { data: { expressionId, definition, cantons } },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      try {
        return prisma.expressionExample.create({
          ...query,
          data: {
            expressionId,
            definition,
            authorId: session.user.id,
            cantons: cantons ?? undefined,
          },
        })
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.log(error)
        throw new Error("Failed to create example")
      }
    },
  }),
  updateExpressionExample: t.prismaField({
    type: "ExpressionExample",
    errors: {
      types: [Error, ValidationError],
    },
    args: {
      data: t.arg({
        type: UpdateExpressionExampleInput,
        required: true,
        validate: {
          schema: z.object({
            exampleId: z.string(),
            definition: z.string().min(2).max(2000),
            cantons: z.array(z.string()).optional().nullable(),
          }),
        },
      }),
    },
    resolve: async (
      query,
      _root,
      { data: { exampleId, definition, cantons } },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      const existingExample = await prisma.expressionExample.findUnique({
        where: { id: exampleId },
        select: { authorId: true },
      })
      if (!existingExample) throw new Error("Example not found")
      if (
        existingExample.authorId !== session.user.id &&
        session.user.role !== Role.ADMIN
      ) {
        throw new GraphQLError("Not authorized")
      }

      try {
        return prisma.expressionExample.update({
          ...query,
          where: { id: exampleId },
          data: {
            definition,
            cantons: cantons ?? undefined,
          },
        })
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.log(error)
        throw new Error("Failed to update example")
      }
    },
  }),
  deleteExpressionExample: t.prismaField({
    type: "ExpressionExample",
    errors: {
      types: [Error],
    },
    args: {
      data: t.arg({ type: DeleteExpressionExampleInput, required: true }),
    },
    resolve: async (query, _root, { data: { exampleId } }, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      const existingExample = await prisma.expressionExample.findUnique({
        where: { id: exampleId },
        select: { authorId: true },
      })
      if (!existingExample) throw new Error("Example not found")
      if (
        existingExample.authorId !== session.user.id &&
        session.user.role !== Role.ADMIN
      ) {
        throw new GraphQLError("Not authorized")
      }

      try {
        return prisma.expressionExample.delete({
          ...query,
          where: { id: exampleId },
        })
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.log(error)
        throw new Error("Failed to delete example")
      }
    },
  }),
}))
