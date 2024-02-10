import { Post, Prisma, Role } from "@prisma/client"
import { builder } from "../builder"
import prisma from "../../lib/prisma"
import { allow } from "graphql-shield"
import * as permissions from "../permissions"
import { ApolloError } from "@apollo/client"

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

builder.prismaObject("Flag", {
  name: "Flag",
  fields: (t) => ({
    post: t.relation("post"),
    postId: t.exposeID("postId"),
    author: t.relation("author"),
    authorId: t.exposeID("authorId"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})

const PostObject = builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
    examples: t.exposeStringList("examples"),
    published: t.exposeBoolean("published"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    author: t.relation("author"),
    likes: t.relation("likes"),
    likesCount: t.int({
      resolve: ({ id }) => prisma.like.count({ where: { postId: id } }),
    }),
    likedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.like.findFirst({
          where: { postId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    dislikes: t.relation("dislikes"),
    dislikesCount: t.int({
      resolve: ({ id }) => prisma.dislike.count({ where: { postId: id } }),
    }),
    dislikedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.dislike.findFirst({
          where: { postId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    flagged: t.relation("flagged"),
    flaggedByMe: t.boolean({
      resolve: async ({ id }, _args, { session }) => {
        return (await prisma.flag.findFirst({
          where: { postId: id, authorId: session?.user?.id },
        }))
          ? true
          : false
      },
    }),
    canton: t.exposeString("canton", { nullable: true }),
  }),
})

const PostsWithCountType = builder.simpleObject("PostsWithCount", {
  fields: (t) => ({
    posts: t.field({ type: [PostObject], nullable: false }),
    count: t.int({ nullable: false }),
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
    resolve: async (query, _root, { q }, _ctx, _info) => {
      return prisma.post.findMany({
        ...query,
        where: {
          published: true,
          title: q ? { contains: q, mode: "insensitive" } : undefined,
        },
        orderBy: { title: "asc" },
      })
    },
  }),
  postsWithCount: t.field({
    type: PostsWithCountType,
    shield: allow,
    nullable: true,
    args: {
      q: t.arg.string(),
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (_root, { q, offset, limit }, _ctx, _info) => {
      const postsWhere: Prisma.PostFindManyArgs = {
        where: {
          published: true,
          title: q ? { contains: q, mode: "insensitive" } : undefined,
        },
      }
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany({
          where: postsWhere.where,
          skip: offset ?? undefined,
          take: limit ?? undefined,
          orderBy: q ? { title: "asc" } : { createdAt: "desc" },
        }),
        prisma.post.count({ where: postsWhere.where }),
      ])

      return { posts, count }
    },
  }),
}))

const CreatePostInput = builder.inputType("CreatePostInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string(),
    examples: t.stringList(),
    authorId: t.string(),
    canton: t.string(),
  }),
})

const UpdatePostInput = builder.inputType("UpdatePostInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string(),
    content: t.string(),
    examples: t.stringList(),
    published: t.boolean(),
    canton: t.string(),
  }),
})

const postActionInput = builder.inputType("PostActionInput", {
  fields: (t) => ({
    postId: t.string({ required: true }),
    like: t.boolean(),
    dislike: t.boolean(),
    flag: t.boolean(),
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
      { data: { title, content, examples, authorId } },
      { session },
    ) => {
      return prisma.post.create({
        ...query,
        data: {
          title,
          content,
          examples: (examples ?? []).filter(
            (example) => !!example.trim().length,
          ),
          author: {
            connect:
              authorId || session?.user?.id
                ? { id: authorId ?? session!.user!.id }
                : undefined,
          },
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
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      const post = await prisma.post.findUnique({
        where: { id: data.id },
        select: { authorId: true },
      })
      if (
        post?.authorId !== session.user.id &&
        session.user.role !== Role.ADMIN
      )
        throw new ApolloError({ errorMessage: "Not allowed" })

      return prisma.post.update({
        ...query,
        where: { id: data.id },
        data: {
          title: data.title ?? undefined,
          content: data.content ?? undefined,
          examples: data.examples ?? undefined,
          published: data.published ?? undefined,
          canton: data.canton !== undefined ? data.canton : undefined,
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
      if (!session?.user) throw new ApolloError({ errorMessage: "Not allowed" })
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      })
      if (
        post?.authorId !== session.user.id ||
        session.user.role !== Role.ADMIN
      )
        throw new ApolloError({ errorMessage: "Not allowed" })

      return prisma.post.delete({
        ...query,
        where: { id: postId },
      })
    },
  }),
  postAction: t.boolean({
    shield: allow, // permissions.isAuthenticated,
    args: {
      data: t.arg({ type: postActionInput, required: true }),
    },
    resolve: async (_root, { data: { postId, ...data } }, { session }) => {
      if (!session?.user) return false

      const authorId = session.user.id

      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
          likes: { where: { authorId } },
          dislikes: { where: { authorId } },
          flagged: { where: { authorId } },
        },
      })

      if (!post) throw new ApolloError({ errorMessage: "Post not found" })

      const action =
        "like" in data
          ? "like"
          : "dislike" in data
            ? "dislike"
            : "flag" in data
              ? "flag"
              : null
      const postId_authorId = { postId, authorId }
      try {
        switch (action) {
          case "like": {
            const updatedPost = await prisma.post.update({
              where: { id: postId },
              data: post.likes.length
                ? { likes: { delete: { postId_authorId } } }
                : {
                    likes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { postId_authorId },
                      },
                    },
                    dislikes: post.dislikes.length
                      ? { delete: { postId_authorId } }
                      : undefined,
                  },
            })

            return !!updatedPost
          }
          case "dislike": {
            const updatedPost = await prisma.post.update({
              where: { id: postId },
              data: post.dislikes.length
                ? { dislikes: { delete: { postId_authorId } } }
                : {
                    dislikes: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { postId_authorId },
                      },
                    },
                    likes: post.likes.length
                      ? { delete: { postId_authorId } }
                      : undefined,
                  },
            })
            return !!updatedPost
          }
          case "flag": {
            const updatedPost = await prisma.post.update({
              where: { id: postId },
              data: post.flagged.length
                ? { flagged: { delete: { postId_authorId } } }
                : {
                    flagged: {
                      connectOrCreate: {
                        create: { authorId },
                        where: { postId_authorId },
                      },
                    },
                  },
            })
            return !!updatedPost
          }
          default:
            return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }),
}))
