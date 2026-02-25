import { Prisma, Role } from "@prisma/client"
import { GraphQLError } from "graphql"
import { z } from "zod"

import prisma from "@/lib/prisma"

import { builder, ValidationError } from "../builder"

const RoleEnum = builder.enumType(Role, {
  name: "Role",
})

const UserType = builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    emailVerified: t.expose("emailVerified", {
      type: "DateTime",
      nullable: true,
    }),
    name: t.exposeString("name"),
    bio: t.exposeString("bio", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", { type: RoleEnum }),
    expressions: t.relation("expressions", {}),
    likes: t.relation("likes", {}),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { authorId: id } }),
    }),
    dislikes: t.relation("dislikes", {}),
    dislikesCount: t.int({
      resolve: ({ id }) => prisma.dislike.count({ where: { authorId: id } }),
    }),
    country: t.exposeString("country", { nullable: true }),
    canton: t.exposeString("canton", { nullable: true }),
    myPublishedExpressionsCount: t.int({
      resolve: (parent) =>
        prisma.expression.count({
          where: { authorId: parent.id, published: true },
        }),
    }),
    myUnpublishedExpressionsCount: t.int({
      resolve: async (parent) =>
        prisma.expression.count({
          where: { authorId: parent.id, published: false },
        }),
    }),
    flags: t.relation("flags", {}),
  }),
})

const UsersWithCountType = builder.simpleObject("UsersWithCount", {
  fields: (t) => ({
    users: t.field({ type: [UserType], nullable: false }),
    count: t.int({ nullable: false }),
  }),
})

const UserIdInput = builder.inputType("UserIdInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
})

builder.queryFields((t) => ({
  me: t.prismaField({
    type: "User",
    resolve: (query, _root, _args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: session.user.id },
      })
    },
  }),
  adminUser: t.prismaField({
    type: "User",
    args: { data: t.arg({ type: UserIdInput, required: true }) },
    resolve: async (query, _root, args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      })
      if (user?.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: args.data.userId },
      })
    },
  }),
  adminUsers: t.field({
    type: UsersWithCountType,
    nullable: true,
    resolve: async (_root, _args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      try {
        const sessionUser = await prisma.user.findUniqueOrThrow({
          where: { id: session.user.id },
          select: { role: true },
        })
        if (sessionUser.role !== Role.ADMIN) {
          throw new GraphQLError("Not authorized")
        }

        const usersWhere: Prisma.UserFindManyArgs = {
          where: {},
        }
        const [users, count] = await prisma.$transaction([
          prisma.user.findMany({ where: usersWhere.where }),
          prisma.user.count({ where: usersWhere.where }),
        ])
        return { users, count }
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  verifyUserNameIsUnique: t.field({
    type: "Boolean",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      const user = await prisma.user.findFirst({
        where: { name: { equals: args.name, mode: "insensitive" } },
      })
      return !user
    },
  }),
}))

const UpdateUserInput = builder.inputType("UpdateUserInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string(),
    image: t.string(),
    bio: t.string(),
    country: t.string(),
    canton: t.string(),
  }),
})

builder.mutationFields((t) => ({
  updateUser: t.prismaField({
    type: "User",
    errors: {
      types: [Error, ValidationError],
    },
    args: {
      data: t.arg({
        type: UpdateUserInput,
        required: true,
        validate: {
          schema: z.object({
            id: z.string(),
            name: z.string().min(2).max(50).optional().nullable(),
            bio: z.string().max(300).optional().nullable(),
            image: z.string().url().optional().nullable(),
            country: z.string().optional().nullable(),
            canton: z.string().optional().nullable(),
          }),
        },
      }),
    },
    resolve: async (query, _root, args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }

      const { id: userId, name, country, canton, ...rest } = args.data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })
      if (
        user?.email !== session.user.email &&
        session.user.role !== Role.ADMIN
      ) {
        throw new GraphQLError("Not authorized")
      }

      return prisma.user.update({
        ...query,
        where: { id: userId },
        data: {
          ...rest,
          name: name ?? undefined,
          country,
          canton: country === "CH" ? canton : null,
        },
      })
    },
  }),
  changeUserRole: t.prismaField({
    type: "User",
    errors: {
      types: [Error],
    },
    args: {
      userId: t.arg.string({ required: true }),
      role: t.arg({ type: RoleEnum, required: true }),
    },
    resolve: async (query, _root, args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      if (session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Only admins are allowed to change roles")
      }
      return prisma.user.update({
        ...query,
        where: { id: args.userId },
        data: { role: args.role as Role },
      })
    },
  }),
  deleteUser: t.prismaField({
    type: "User",
    errors: {
      types: [Error],
    },
    args: { data: t.arg({ type: UserIdInput, required: true }) },
    resolve: async (query, _root, args, { session }) => {
      if (!session?.user) {
        throw new GraphQLError("Not authenticated")
      }
      const user = await prisma.user.findUnique({
        where: { id: args.data.userId },
      })
      if (user?.id !== session.user.id && session.user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized")
      }

      return prisma.user.delete({ ...query, where: { id: args.data.userId } })
    },
  }),
}))
