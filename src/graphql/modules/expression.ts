import { Prisma, Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"
import { ApolloError } from "@apollo/client"
import { Language } from "./language"
import { ExpressionGender } from "./expressionGender"
import { ExpressionType } from "./expressionType"

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
    examples: t.relation("examples"),
    published: t.exposeBoolean("published"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    author: t.relation("author"),
    likes: t.relation("likes"),
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
    dislikes: t.relation("dislikes"),
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
    flagged: t.relation("flagged"),
    flaggedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.flag.findFirst({
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
    slug: t.string(),
    language: t.field({ type: Language }),
    authorName: t.string(),
  }),
})

builder.queryFields((t) => ({
  expression: t.prismaField({
    type: "Expression",
    shield: allow,
    nullable: true,
    args: {
      data: t.arg({ type: ExpressionIdInput, required: true }),
    },
    resolve: async (query, _root, { data: { expressionId } }, _ctx, _info) =>
      prisma.expression.findUnique({ ...query, where: { id: expressionId } }),
  }),
  expressionsQuery: t.field({
    type: ExpressionsWithCountType,
    shield: allow,
    nullable: true,
    args: { data: t.arg({ type: ExpressionsQueryInput, required: true }) },
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
      const expressionsWhere: Prisma.ExpressionFindManyArgs = {
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
                    { definition: { contains: q, mode: "insensitive" } },
                  ]
                : undefined,
            },
          ],
        },
      }
      const [expressions, count] = await prisma.$transaction([
        prisma.expression.findMany({
          where: expressionsWhere.where,
          skip: offset ?? undefined,
          take: limit ?? undefined,
          orderBy: q ? { title: "asc" } : { createdAt: "desc" },
        }),
        prisma.expression.count({ where: expressionsWhere.where }),
      ])

      return { expressions, count }
    },
  }),
  adminExpressions: t.field({
    type: ExpressionsWithCountType,
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: {},
    resolve: async (_root, _args, { session }, _info) => {
      try {
        if (!session?.user) return null

        const expressionsWhere: Prisma.ExpressionFindManyArgs = {
          where: {
            authorId:
              session.user.role === Role.ADMIN ? undefined : session.user.id,
          },
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
        // eslint-disable-next-line no-console
        console.error(error)
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
  }),
})

const ExpressionIdInput = builder.inputType("ExpressionIdInput", {
  fields: (t) => ({
    expressionId: t.string({ required: true }),
  }),
})
const CreateExpressionExampleInput = builder.inputType(
  "CreateExpressionExampleInput",
  {
    fields: (t) => ({
      expressionId: t.string({ required: true }),
      definition: t.string({ required: true }),
    }),
  },
)

const UpdateExpressionExampleInput = builder.inputType(
  "UpdateExpressionExampleInput",
  {
    fields: (t) => ({
      exampleId: t.string({ required: true }),
      definition: t.string({ required: true }),
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
    shield: permissions.isAuthenticated,
    nullable: true,
    args: { data: t.arg({ type: CreateExpressionInput, required: true }) },
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
          type,
          gender,
        },
      },
      { session },
    ) => {
      try {
        const author = session?.user
        if (!author) throw new ApolloError({ errorMessage: "Not allowed" })
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
              ? { create: { definition: example, authorId: author.id } }
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
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  updateExpression: t.prismaField({
    type: "Expression",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: UpdateExpressionInput, required: true }) },
    resolve: async (
      query,
      _root,
      { data: { id, title, definition, published, cantons, type, gender } },
      { session },
      _info,
    ) => {
      try {
        if (!session?.user)
          throw new ApolloError({ errorMessage: "Not allowed" })
        const expression = await prisma.expression.findUnique({
          where: { id },
          select: { authorId: true },
        })
        if (
          expression?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        )
          throw new ApolloError({ errorMessage: "Not allowed" })

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
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  deleteExpression: t.prismaField({
    type: "Expression",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: ExpressionIdInput, required: true }) },
    resolve: async (query, _root, { data: { expressionId } }, { session }) => {
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      try {
        const expression = await prisma.expression.findFirstOrThrow({
          where: { id: expressionId },
          select: { authorId: true },
        })
        if (
          expression?.authorId !== session.user.id &&
          session.user.role !== Role.ADMIN
        )
          throw new ApolloError({ errorMessage: "Not allowed" })

        return prisma.expression.delete({
          ...query,
          where: { id: expressionId },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  expressionAction: t.boolean({
    shield: permissions.isAuthenticated,
    args: {
      data: t.arg({ type: ExpressionActionInput, required: true }),
    },
    resolve: async (
      _root,
      { data: { expressionId, ...data } },
      { session },
    ) => {
      try {
        if (!session?.user) return false

        const authorId = session.user.id

        const expression = await prisma.expression.findUnique({
          where: { id: expressionId },
          select: {
            likes: { where: { authorId } },
            dislikes: { where: { authorId } },
            flagged: { where: { authorId } },
          },
        })

        if (!expression)
          throw new ApolloError({ errorMessage: "Expression not found" })

        const action =
          "like" in data
            ? "like"
            : "dislike" in data
              ? "dislike"
              : "flag" in data
                ? "flag"
                : null
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
  createExpressionExample: t.prismaField({
    type: "ExpressionExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: CreateExpressionExampleInput, required: true }),
    },
    resolve: async (
      query,
      _root,
      { data: { expressionId, definition } },
      { session },
    ) => {
      try {
        return prisma.expressionExample.create({
          ...query,
          data: {
            expressionId,
            definition,
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
  updateExpressionExample: t.prismaField({
    type: "ExpressionExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: UpdateExpressionExampleInput, required: true }),
    },
    resolve: async (
      query,
      _root,
      { data: { exampleId, definition } },
      _ctx,
    ) => {
      try {
        return prisma.expressionExample.update({
          ...query,
          where: { id: exampleId },
          data: {
            definition,
          },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return null
      }
    },
  }),
  deleteExpressionExample: t.prismaField({
    type: "ExpressionExample",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: {
      data: t.arg({ type: DeleteExpressionExampleInput, required: true }),
    },
    resolve: async (query, _root, { data: { exampleId } }, _ctx) => {
      try {
        return prisma.expressionExample.delete({
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
