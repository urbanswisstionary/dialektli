import { Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { ApolloError } from "@apollo/client"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"

builder.enumType(Role, {
  name: "Role",
})

builder.prismaObject("User", {
  // Optional name for the object, defaults to the name of the prisma model
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    emailVerified: t.expose("emailVerified", {
      type: "DateTime",
      nullable: true,
    }),
    name: t.exposeString("name", { nullable: true }),
    bio: t.exposeString("bio", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", { type: "Role" }),
    posts: t.relation("posts"),
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
  user: t.prismaField({
    type: "User",
    shield: permissions.isAuthenticated,
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _root, { email }) =>
      prisma.user.findUniqueOrThrow({ ...query, where: { email } }),
  }),
  users: t.prismaField({
    type: ["User"],
    shield: permissions.isAuthenticated,
    resolve: (query) => prisma.user.findMany({ ...query }),
  }),
}))

const CreateUserInput = builder.inputType("CreateUserInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string(),
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
      { data: { id: userId, ...data } },
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
        data,
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
