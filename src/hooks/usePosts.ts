import { graphql } from "@@/generated"
import { CreatePostInput, UpdatePostInput } from "@@/generated/graphql"
import { useMutation, useQuery } from "@apollo/client"

export const PostFragment = graphql(/* GraphQL */ `
  fragment PostFragment on Post {
    id
    author {
      id
      name
      image
    }
    title
    content
    examples
    published
    likesCount
    likedByMe
    dislikesCount
    dislikedByMe
    flaggedByMe

    createdAt
    updatedAt
    canton
  }
`)

const PostsQuery = graphql(/* GraphQL */ `
  query Posts(
    $q: String
    $offset: Int
    $limit: Int
    $canton: String
    $firstChar: String
  ) {
    posts(
      q: $q
      offset: $offset
      limit: $limit
      canton: $canton
      firstChar: $firstChar
    ) {
      posts {
        ...PostFragment
      }
      count
    }
  }
`)

export const usePostsQuery = (variables: {
  q?: string
  offset?: number
  limit?: number
  canton?: string | null
  firstChar?: string
}) => useQuery(PostsQuery, { variables })

export const AdminPostFragment = graphql(/* GraphQL */ `
  fragment AdminPostFragment on Post {
    id
    author {
      id
      name
      image
    }
    title
    content
    examples
    published
    likesCount
    dislikesCount
    createdAt
    updatedAt
    canton
    flagged {
      authorId
      createdAt
    }
  }
`)

const AdminPostsQuery = graphql(/* GraphQL */ `
  query AdminPosts {
    adminPosts {
      posts {
        ...AdminPostFragment
      }
      count
    }
  }
`)

export const useAdminPostsQuery = () => useQuery(AdminPostsQuery)

export const useCreatePostMutation = () => {
  const [createPost, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreatePost($data: CreatePostInput!) {
        createPost(data: $data) {
          id
        }
      }
    `),
    {
      // awaitRefetchQueries: true,
      // refetchQueries: () => [{ query: PostsQuery }, { query: AdminPostsQuery }],
      // update: (cache, { data }) => {
      //   if (data?.createPost) {
      //     cache.modify({
      //       fields: {
      //         posts: (_existingPosts = []) => {},
      //         adminPosts: (_existingPosts = []) => {},
      //       },
      //     })
      //   }
      // },
    },
  )

  return {
    createPost: (
      data: CreatePostInput,
      onCompletedCallback?: (_postId?: string) => void,
    ) =>
      createPost({
        variables: { data },
        onCompleted: (data) => {
          if (onCompletedCallback) onCompletedCallback(data.createPost?.id)
        },
        awaitRefetchQueries: true,
        refetchQueries: () =>
          data.authorId
            ? [{ query: PostsQuery }, { query: AdminPostsQuery }]
            : [{ query: PostsQuery }],
        update: (cache, ctx) => {
          if (data.authorId && ctx.data?.createPost) {
            cache.modify({
              fields: {
                posts: (_existingPosts = []) => {},
                adminPosts: (_existingPosts = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

export const useUpdatePostMutations = () => {
  const [updatePost, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdatePost($data: UpdatePostInput!) {
        updatePost(data: $data) {
          id
        }
      }
    `),
  )
  return {
    updatePost: (data: UpdatePostInput, onCompletedCallback?: () => void) =>
      updatePost({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        refetchQueries: [
          { query: PostQuery, variables: { data: { postId: data.id } } },
        ],
        update: (cache, { data }) => {
          if (data?.updatePost) {
            cache.modify({
              fields: {
                posts: (_existingPosts = []) => {},
                adminPosts: (_existingPosts = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

export const useDeletePostMutation = () => {
  const [deletePost, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation DeletePost($data: PostIdInput!) {
        deletePost(data: $data) {
          id
        }
      }
    `),
    {
      awaitRefetchQueries: true,
      refetchQueries: () => [{ query: PostsQuery }, { query: AdminPostsQuery }],
      update: (cache, { data }) => {
        if (data?.deletePost) {
          cache.modify({
            fields: {
              posts: (_existingPosts = []) => {},
              adminPosts: (_existingPosts = []) => {},
            },
          })
        }
      },
    },
  )

  return {
    deletePost: (postId: string, onCompletedCallback?: () => void) =>
      deletePost({
        variables: { data: { postId } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
      }),
    ...mutationResult,
  }
}

const PostQuery = graphql(/* GraphQL */ `
  query Post($data: PostIdInput!) {
    post(data: $data) {
      id
      ...PostFragment
    }
  }
`)

export const usePost = (postId: string) =>
  useQuery(PostQuery, { variables: { data: { postId } }, skip: !postId })

export const usePostAction = (postId: string) => {
  const [postAction, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation PostAction($data: PostActionInput!) {
        postAction(data: $data)
      }
    `),
    { refetchQueries: [{ query: PostQuery, variables: { data: { postId } } }] },
  )
  return {
    postAction: (
      action: "like" | "dislike" | "flag",
      onCompletedCallback?: () => void,
    ) =>
      postAction({
        variables: { data: { postId, [action]: true } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: () => [
          { query: PostsQuery },
          { query: AdminPostsQuery },
        ],
        update: (cache, { data }) => {
          if (data?.postAction) {
            cache.modify({
              fields: {
                posts: (_existingPosts = []) => {},
                adminPosts: (_existingPosts = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}
