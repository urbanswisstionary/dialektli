import { useMutation, useQuery } from "@apollo/client"
import { MeQuery, UpdateUserInput } from "../../generated/graphql"
import { getFragmentData, graphql } from "../../generated"

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

export const useUpdateUserMutation = () => {
  const [updateUser, { data, loading, error }] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          ...MeFragment
        }
      }
    `),
  )

  return {
    updateUser: async (userData: UpdateUserInput) =>
      await updateUser({ variables: { data: userData } }),
    data,
    loading,
    error,
  }
}

const useMe = () => {
  const { data, refetch, ...props } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  })

  return {
    ...getMe(data),
    refetchMe: async () => getMe((await refetch())?.data),
    ...props,
  }
}

export default useMe
