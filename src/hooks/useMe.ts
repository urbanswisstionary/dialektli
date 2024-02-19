import { useMutation, useQuery } from "@apollo/client"
import { MeQuery, Role, UpdateUserInput } from "@@/generated/graphql"
import { getFragmentData, graphql } from "@@/generated"
import { useSession } from "next-auth/react"

export const MeFragment = graphql(/* GraphQL */ `
  fragment MeFragment on User {
    id
    email
    name
    role
    image
    bio
    country
    canton
    likesCount
    dislikesCount
    posts {
      id
      title
    }
    myPublishedPostsCount
    myUnpublishedPostsCount
  }
`)

const getMe = (data?: MeQuery) => {
  const me = getFragmentData(MeFragment, data?.me)
  return {
    me,
    isAdmin: me?.role === "ADMIN",
  }
}

export const ME_QUERY = graphql(/* GraphQL */ `
  query Me {
    me {
      ...MeFragment
    }
  }
`)

export const useMe = () => {
  const { status } = useSession()
  const { data, refetch, ...props } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    skip: status !== "authenticated",
  })

  return {
    ...getMe(data),
    refetchMe: async () => getMe((await refetch())?.data),
    ...props,
  }
}

export const useUpdateUserMutation = () => {
  const [updateUser, { data, loading, error }] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          ...MeFragment
        }
      }
    `),
    { refetchQueries: [{ query: ME_QUERY }] },
  )

  return {
    updateUser: async (userData: UpdateUserInput) =>
      await updateUser({ variables: { data: userData } }),
    data,
    loading,
    error,
  }
}

export const useChangeUserRoleMutation = () => {
  const [changeUserRole, { data, loading, error }] = useMutation(
    graphql(/* GraphQL */ `
      mutation ChangeUserRole($userId: String!, $role: Role!) {
        changeUserRole(userId: $userId, role: $role) {
          ...MeFragment
        }
      }
    `),
    { refetchQueries: [{ query: ME_QUERY }] },
  )

  return {
    changeUserRole: async (variables: { userId: string; role: Role }) =>
      await changeUserRole({ variables }),
    data,
    loading,
    error,
  }
}
