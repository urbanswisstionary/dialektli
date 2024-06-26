import { Prisma, Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { ApolloError } from "@apollo/client"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"

builder.enumType(Role, {
  name: "Role",
})
const UserType = builder.prismaObject("User", {
  // Optional name for the object, defaults to the name of the prisma model
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
    role: t.expose("role", { type: "Role" }),
    expressions: t.relation("expressions"),
    likes: t.relation("likes"),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { authorId: id } }),
    }),
    dislikes: t.relation("dislikes"),
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
    flags: t.relation("flags"),
  }),
})
const UsersWithCountType = builder.simpleObject("UsersWithCount", {
  fields: (t) => ({
    users: t.field({ type: [UserType], nullable: false }),
    count: t.int({ nullable: false }),
  }),
})

builder.queryFields((t) => ({
  me: t.prismaField({
    type: "User",
    shield: permissions.isAuthenticated,
    resolve: (query, _root, _args, { session }) =>
      prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: session?.user?.id },
      }),
  }),
  adminUser: t.prismaField({
    type: "User",
    shield: permissions.isAdmin,
    args: { data: t.arg({ type: UserIdInput, required: true }) },
    resolve: (query, _root, { data }) =>
      prisma.user.findUniqueOrThrow({ ...query, where: { id: data.userId } }),
  }),
  adminUsers: t.field({
    type: UsersWithCountType,
    shield: permissions.isAdmin,
    nullable: true,
    resolve: async (_root, _args, { session }) => {
      try {
        const sessionUser = await prisma.user.findUniqueOrThrow({
          where: { id: session?.user?.id },
          select: { role: true },
        })
        if (sessionUser.role !== Role.ADMIN)
          throw new ApolloError({ errorMessage: "Not Allowed" })

        const usersWhere: Prisma.UserFindManyArgs = {
          where: {},
        }
        const [users, count] = await prisma.$transaction([
          prisma.user.findMany({ where: usersWhere.where }),
          prisma.user.count({ where: usersWhere.where }),
        ])
        return { users, count }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }),
  verifyUserNameIsUnique: t.field({
    type: "Boolean",
    shield: permissions.isAuthenticated,
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_root, { name }) => {
      const user = await prisma.user.findFirst({
        where: { name: { equals: name, mode: "insensitive" } },
      })
      return !user
    },
  }),
}))

const CreateUserInput = builder.inputType("CreateUserInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string({ required: true }),
    image: t.string(),
    bio: t.string(),
    country: t.string(),
    canton: t.string(),
  }),
})

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
const UserIdInput = builder.inputType("UserIdInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
})

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: "User",
    shield: allow,
    nullable: true,
    args: { data: t.arg({ type: CreateUserInput, required: true }) },
    resolve: (query, _root, { data }) => prisma.user.create({ ...query, data }),
  }),
  updateUser: t.prismaField({
    type: "User",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: UpdateUserInput, required: true }) },
    resolve: async (
      query,
      _root,
      { data: { id: userId, name, country, canton, ...data } },
      { session },
      _info,
    ) => {
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })
      if (
        user?.email !== session.user.email &&
        session.user.role !== Role.ADMIN
      )
        throw new ApolloError({ errorMessage: "Not allowed" })

      return prisma.user.update({
        ...query,
        where: { id: userId },
        data: {
          ...data,
          name: name ?? undefined,
          country,
          canton: country === "CH" ? canton : null,
        },
      })
    },
  }),
  changeUserRole: t.prismaField({
    type: "User",
    shield: permissions.isAdmin,
    nullable: true,
    args: {
      userId: t.arg.string({ required: true }),
      role: t.arg({ type: "Role", required: true }),
    },
    resolve: async (query, _root, { userId, role }, { session }, _info) => {
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      if (session.user.role !== Role.ADMIN)
        throw new ApolloError({
          errorMessage: "Only admins are allowed to change roles",
        })
      return prisma.user.update({
        ...query,
        where: { id: userId },
        data: { role },
      })
    },
  }),
  deleteUser: t.prismaField({
    type: "User",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: UserIdInput, required: true }) },
    resolve: async (query, _root, { data: { userId } }, { session }) => {
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user?.id !== session.user.id && session.user.role !== Role.ADMIN)
        throw new ApolloError({ errorMessage: "Not allowed" })

      return prisma.user.delete({ ...query, where: { id: userId } })
    },
  }),
}))
