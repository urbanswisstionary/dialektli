import { Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"

builder.prismaObject("Like", {
  name: "Like",
  fields: (t) => ({
    post: t.relation("post"),
    postId: t.exposeID("postId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})

builder.prismaObject("Dislike", {
  name: "Dislike",
  fields: (t) => ({
    post: t.relation("post"),
    postId: t.exposeID("postId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
    examples: t.exposeStringList("examples"),
    published: t.exposeBoolean("published"),
    author: t.relation("author"),
    likes: t.relation("likes"),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { postId: id } }),
    }),
    dislikes: t.relation("dislikes"),
    dislikesCount: t.int({
      resolve: ({ id }) => prisma.dislike.count({ where: { postId: id } }),
    }),
  }),
})

builder.queryFields((t) => ({
  post: t.prismaField({
    type: "Post",
    shield: allow,
    nullable: true,
    args: {
      data: t.arg({ type: PostIdInput, required: true }),
    },
    resolve: async (query, _root, { data: { postId } }, _ctx, _info) => {
      if (!postId) return null
      return prisma.post.findFirstOrThrow({
        ...query,
        where: { id: postId },
      })
    },
  }),
  posts: t.prismaField({
    type: ["Post"],
    shield: allow,
    nullable: true,
    args: {
      q: t.arg.string(),
    },
    resolve: async (query, _root, { q }, _ctx, _info) =>
      prisma.post.findMany({
        ...query,
        where: {
          published: true,
          title: q ? { contains: q, mode: "insensitive" } : undefined,
        },
      }),
  }),
}))

const CreatePostInput = builder.inputType("CreatePostInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string(),
    examples: t.stringList(),
  }),
})

const UpdatePostInput = builder.inputType("UpdatePostInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string(),
    content: t.string(),
    examples: t.stringList(),
    published: t.boolean(),
  }),
})
const PostIdInput = builder.inputType("PostIdInput", {
  fields: (t) => ({
    postId: t.string({ required: true }),
  }),
})

builder.mutationFields((t) => ({
  createPost: t.prismaField({
    type: "Post",
    shield: permissions.isAuthenticated,
    nullable: true,
    args: { data: t.arg({ type: CreatePostInput, required: true }) },
    resolve: async (
      query,
      _root,
      { data: { title, content, examples } },
      { session },
    ) => {
      if (!session?.user) throw new Error("Not allowed")
      const authorId = session.user.id
      return prisma.post.create({
        ...query,
        data: {
          title,
          content,
          examples: examples ?? [],
          author: { connect: { id: authorId } },
        },
      })
    },
  }),
  updatePost: t.prismaField({
    type: "Post",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: UpdatePostInput, required: true }) },
    resolve: async (query, _root, { data }, { session }, _info) => {
      if (!session?.user) throw new Error("Not allowed")
      const post = await prisma.post.findUnique({
        where: { id: data.id },
        select: { authorId: true },
      })
      if (
        post?.authorId !== session.user.id &&
        session.user.role !== Role.ADMIN
      )
        throw new Error("Not allowed")

      return prisma.post.update({
        ...query,
        where: { id: data.id },
        data: {
          title: data.title ?? undefined,
          content: data.content,
          examples: data.examples ?? undefined,
          published: data.published ?? undefined,
        },
      })
    },
  }),
  deletePost: t.prismaField({
    type: "Post",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: PostIdInput, required: true }) },
    resolve: async (query, _root, { data: { postId } }, { session }) => {
      if (!session?.user) throw new Error("Not allowed")
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      })
      if (
        post?.authorId !== session.user.id ||
        session.user.role !== Role.ADMIN
      )
        throw new Error("Not allowed")

      return prisma.post.delete({
        ...query,
        where: { id: postId },
      })
    },
  }),
  likePost: t.prismaField({
    type: "Post",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: PostIdInput, required: true }) },
    resolve: async (query, _root, { data: { postId } }, { session }) => {
      if (!session?.user) throw new Error("Not allowed")
      const authorId = session.user.id
      const post = await prisma.post.update({
        ...query,
        where: { id: postId },
        data: {
          likes: {
            connectOrCreate: {
              where: {
                postId_authorId: { authorId: authorId, postId },
              },
              create: { author: { connect: { id: authorId } } },
            },
          },
        },
      })

      return post
    },
  }),
  dislikePost: t.prismaField({
    type: "Dislike",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: PostIdInput, required: true }) },
    resolve: async (query, _root, { data: { postId } }, { session }) => {
      if (!session?.user) throw new Error("Not allowed")
      const authorId = session.user.id
      return prisma.dislike.create({
        ...query,
        data: {
          post: { connect: { id: postId } },
          author: { connect: { id: authorId } },
        },
      })
    },
  }),
  deleteLike: t.prismaField({
    type: "Like",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: PostIdInput, required: true }) },
    resolve: async (query, _root, { data: { postId } }, { session }) => {
      if (!session?.user) throw new Error("Not allowed")
      const authorId = session.user.id
      return prisma.like.delete({
        ...query,
        where: { postId_authorId: { postId, authorId } },
      })
    },
  }),
  deleteDislike: t.prismaField({
    type: "Dislike",
    shield: permissions.isAdminOrMe,
    nullable: true,
    args: { data: t.arg({ type: PostIdInput, required: true }) },
    resolve: async (query, _root, { data: { postId } }, { session }) => {
      if (!session?.user) throw new Error("Not allowed")
      const authorId = session.user.id
      return prisma.dislike.delete({
        ...query,
        where: { postId_authorId: { postId, authorId } },
      })
    },
  }),
}))
