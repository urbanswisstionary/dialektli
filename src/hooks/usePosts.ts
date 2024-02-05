import { graphql } from "@@/generated"
import { useQuery } from "@apollo/client"

export const PostFragment = graphql(/* GraphQL */ `
  fragment PostFragment on Post {
    id
    author {
      id
      name
    }
    title
    content
    examples
    published
    likesCount
    dislikesCount
  }
`)

const PostsQueryQuery = graphql(/* GraphQL */ `
  query PostsQuery($q: String) {
    posts(q: $q) {
      id
      title
    }
  }
`)

export const usePostsQuery = (q: string) =>
  useQuery(PostsQueryQuery, { variables: { q }, skip: !q.length })

const PostsQuery = graphql(/* GraphQL */ `
  query Posts {
    posts {
      ...PostFragment
    }
  }
`)
export const usePosts = () => useQuery(PostsQuery)
