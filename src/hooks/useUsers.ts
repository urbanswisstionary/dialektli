import { useMutation, useQuery } from "@apollo/client"
import { MeQuery, Role, UpdateUserInput } from "@@/generated/graphql"
import { getFragmentData, graphql } from "@@/generated"
import { useSession } from "next-auth/react"
import { AdminTermsQuery } from "./useTerms"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const AdminUserFragment = graphql(/* GraphQL */ `
  fragment AdminUserFragment on User {
    id
    email
    emailVerified
    name
    bio
    image
    role
    terms {
      id
      ...AdminTermFragment
    }
    country
    canton
    likesCount
    dislikesCount
    publishedTermsCount: myPublishedTermsCount
    unpublishedTermsCount: myUnpublishedTermsCount
    flags {
      termId
      createdAt
    }
  }
`)

export const useAdminUserQuery = () =>
  useQuery(
    graphql(/* GraphQL */ `
      query AdminUserQuery($data: UserIdInput!) {
        adminUser(data: $data) {
          ...AdminUserFragment
        }
      }
    `),
  )

export const AdminUsersFragment = graphql(/* GraphQL */ `
  fragment AdminUsersFragment on User {
    id
    email
    name
    role
    country
    canton
    likesCount
    dislikesCount
    publishedTermsCount: myPublishedTermsCount
    unpublishedTermsCount: myUnpublishedTermsCount
  }
`)

export const useAdminUsersQuery = () =>
  useQuery(
    graphql(/* GraphQL */ `
      query AdminUsersQuery {
        adminUsers {
          users {
            ...AdminUsersFragment
          }
          count
        }
      }
    `),
  )
