import { Role, Language as PrismaLanguage } from "@prisma/client"
import { GraphQLError } from "graphql"
import { builder } from "../builder"
import prisma from "@/lib/prisma"
import { Language } from "./language"

const SemanticGroup = builder.prismaObject("SemanticGroup", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    nameDE: t.exposeString("nameDE", { nullable: true }),
    nameFR: t.exposeString("nameFR", { nullable: true }),
    nameIT: t.exposeString("nameIT", { nullable: true }),
    description: t.exposeString("description", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    expressions: t.relation("expressions"),
    expressionCount: t.int({
      resolve: ({ id }) =>
        prisma.expression.count({
          where: {
            semanticGroups: { some: { id } },
            published: true,
          },
        }),
    }),
  }),
})

const CantonExpressionCount = builder.simpleObject("CantonExpressionCount", {
  fields: (t) => ({
    canton: t.string({ nullable: false }),
    count: t.int({ nullable: false }),
  }),
})

const CantonExpression = builder.simpleObject("CantonExpression", {
  fields: (t) => ({
    id: t.string({ nullable: false }),
    title: t.string({ nullable: false }),
    language: t.field({ type: Language, nullable: true }),
  }),
})

const CantonExpressionDetail = builder.simpleObject("CantonExpressionDetail", {
  fields: (t) => ({
    canton: t.string({ nullable: false }),
    expressions: t.field({ type: [CantonExpression], nullable: false }),
  }),
})

const SemanticGroupWithDistribution = builder.simpleObject(
  "SemanticGroupWithDistribution",
  {
    fields: (t) => ({
      semanticGroup: t.field({ type: SemanticGroup, nullable: false }),
      cantonDistribution: t.field({
        type: [CantonExpressionCount],
        nullable: false,
      }),
      cantonExpressions: t.field({
        type: [CantonExpressionDetail],
        nullable: false,
      }),
    }),
  },
)

const SemanticGroupQueryInput = builder.inputType("SemanticGroupQueryInput", {
  fields: (t) => ({
    q: t.string(),
    limit: t.int(),
    offset: t.int(),
  }),
})

builder.queryFields((t) => ({
  semanticGroups: t.field({
    type: [SemanticGroup],
    nullable: false,
    args: { data: t.arg({ type: SemanticGroupQueryInput }) },
    resolve: async (_root, { data }) => {
      return prisma.semanticGroup.findMany({
        where: data?.q
          ? {
              OR: [
                { name: { contains: data.q, mode: "insensitive" } },
                { nameDE: { contains: data.q, mode: "insensitive" } },
                { nameFR: { contains: data.q, mode: "insensitive" } },
                { nameIT: { contains: data.q, mode: "insensitive" } },
              ],
            }
          : undefined,
        orderBy: { name: "asc" },
        skip: data?.offset ?? undefined,
        take: data?.limit ?? undefined,
      })
    },
  }),

  semanticGroupDistribution: t.field({
    type: SemanticGroupWithDistribution,
    nullable: true,
    args: {
      semanticGroupId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { semanticGroupId }) => {
      const semanticGroup = await prisma.semanticGroup.findUnique({
        where: { id: semanticGroupId },
        include: {
          expressions: {
            where: { published: true },
            select: {
              id: true,
              title: true,
              cantons: true,
              language: true,
            },
          },
        },
      })

      if (!semanticGroup) return null

      const cantonMap = new Map<
        string,
        { id: string; title: string; language: PrismaLanguage | null }[]
      >()

      for (const expr of semanticGroup.expressions) {
        for (const canton of expr.cantons) {
          if (!cantonMap.has(canton)) {
            cantonMap.set(canton, [])
          }
          cantonMap.get(canton)!.push({
            id: expr.id,
            title: expr.title,
            language: expr.language,
          })
        }
      }

      const cantonDistribution = Array.from(cantonMap.entries()).map(
        ([canton, exprs]) => ({
          canton,
          count: exprs.length,
        }),
      )

      const cantonExpressions = Array.from(cantonMap.entries()).map(
        ([canton, exprs]) => ({
          canton,
          expressions: exprs,
        }),
      )

      return {
        semanticGroup,
        cantonDistribution,
        cantonExpressions,
      }
    },
  }),

  cantonOverview: t.field({
    type: [CantonExpressionCount],
    nullable: false,
    args: {
      language: t.arg({ type: Language }),
    },
    resolve: async (_root, { language }) => {
      const expressions = await prisma.expression.findMany({
        where: {
          published: true,
          language: language ?? undefined,
        },
        select: { cantons: true },
      })

      const cantonCounts = new Map<string, number>()
      for (const expr of expressions) {
        for (const canton of expr.cantons) {
          cantonCounts.set(canton, (cantonCounts.get(canton) ?? 0) + 1)
        }
      }

      return Array.from(cantonCounts.entries())
        .map(([canton, count]) => ({ canton, count }))
        .sort((a, b) => b.count - a.count)
    },
  }),

  expressionsByCanton: t.field({
    type: [CantonExpression],
    nullable: false,
    args: {
      canton: t.arg.string({ required: true }),
      language: t.arg({ type: Language }),
      limit: t.arg.int(),
      offset: t.arg.int(),
    },
    resolve: async (_root, { canton, language, limit, offset }) => {
      const expressions = await prisma.expression.findMany({
        where: {
          published: true,
          cantons: { has: canton },
          language: language ?? undefined,
        },
        select: {
          id: true,
          title: true,
          language: true,
        },
        orderBy: { title: "asc" },
        skip: offset ?? undefined,
        take: limit ?? undefined,
      })

      return expressions
    },
  }),
}))

const CreateSemanticGroupInput = builder.inputType("CreateSemanticGroupInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    nameDE: t.string(),
    nameFR: t.string(),
    nameIT: t.string(),
    description: t.string(),
    expressionIds: t.stringList(),
  }),
})

const UpdateSemanticGroupInput = builder.inputType("UpdateSemanticGroupInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string(),
    nameDE: t.string(),
    nameFR: t.string(),
    nameIT: t.string(),
    description: t.string(),
    expressionIds: t.stringList(),
  }),
})

builder.mutationFields((t) => ({
  createSemanticGroup: t.prismaField({
    type: "SemanticGroup",
    nullable: true,
    args: {
      data: t.arg({ type: CreateSemanticGroupInput, required: true }),
    },
    resolve: async (
      query,
      _root,
      { data: { name, nameDE, nameFR, nameIT, description, expressionIds } },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      if (session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }

      try {
        return prisma.semanticGroup.create({
          ...query,
          data: {
            name,
            nameDE,
            nameFR,
            nameIT,
            description,
            expressions: expressionIds?.length
              ? { connect: expressionIds.map((id) => ({ id })) }
              : undefined,
          },
        })
      } catch (error) {
        console.error("Failed to create semantic group:", error)
        throw new GraphQLError(
          error instanceof Error
            ? error.message
            : "Failed to create semantic group",
        )
      }
    },
  }),

  updateSemanticGroup: t.prismaField({
    type: "SemanticGroup",
    nullable: true,
    args: {
      data: t.arg({ type: UpdateSemanticGroupInput, required: true }),
    },
    resolve: async (
      query,
      _root,
      {
        data: { id, name, nameDE, nameFR, nameIT, description, expressionIds },
      },
      { session },
    ) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      if (session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }

      try {
        return prisma.semanticGroup.update({
          ...query,
          where: { id },
          data: {
            name: name ?? undefined,
            nameDE,
            nameFR,
            nameIT,
            description,
            expressions: expressionIds
              ? { set: expressionIds.map((eid) => ({ id: eid })) }
              : undefined,
          },
        })
      } catch (error) {
        console.error("Failed to update semantic group:", error)
        throw new GraphQLError(
          error instanceof Error
            ? error.message
            : "Failed to update semantic group",
        )
      }
    },
  }),

  deleteSemanticGroup: t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      if (session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }

      try {
        await prisma.semanticGroup.delete({ where: { id } })
        return true
      } catch (error) {
        console.error("Failed to delete semantic group:", error)
        return false
      }
    },
  }),
}))
