import { graphql } from "@@/generated"
import { CreatePostInput } from "@@/generated/graphql"
import { useMutation, useQuery } from "@apollo/client"

const PostsQuery = graphql(/* GraphQL */ `
  query PostsQuery($q: String) {
    posts(q: $q) {
      id
      title
    }
  }
`)

export const usePostsQuery = (q: string, skip?: boolean) =>
  useQuery(PostsQuery, { variables: { q }, skip })

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
  }
`)

export const usePosts = ({
  q,
  offset,
  limit,
}: { q?: string; offset?: number; limit?: number } = {}) =>
  useQuery(
    graphql(/* GraphQL */ `
      query Posts($q: String, $offset: Int, $limit: Int) {
        postsWithCount(q: $q, offset: $offset, limit: $limit) {
          posts {
            ...PostFragment
          }
          count
        }
      }
    `),
    {
      variables: { q, offset, limit },
    },
  )

export const useCreatePostMutation = () => {
  const [createPost, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreatePost($data: CreatePostInput!) {
        createPost(data: $data) {
          id
        }
      }
    `),
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
      }),
    ...mutationResult,
  }
}
