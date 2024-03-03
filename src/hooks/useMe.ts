import { useMutation, useQuery } from "@apollo/client"
import { MeQuery, Role, UpdateUserInput } from "@@/generated/graphql"
import { getFragmentData, graphql } from "@@/generated"
import { useSession } from "next-auth/react"
import { AdminTermsQuery } from "./useTerms"
import { useRouter } from "next/router"
import { useEffect } from "react"

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
    terms {
      id
      title
    }
    myPublishedTermsCount
    myUnpublishedTermsCount
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

const welcomePath = "/account/welcome"
const useHandleNewUser = (meQuery?: MeQuery) => {
  const router = useRouter()
  const { me } = getMe(meQuery)

  useEffect(() => {
    // if a new user signs in and has no name, redirect to welcome page so they can set their name
    if (!!me && !me?.name.length && router.pathname !== welcomePath)
      router?.push(welcomePath)
  }, [me, router])
}
export const useMe = () => {
  const { status } = useSession()
  const { data, refetch, ...rest } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    skip: status !== "authenticated",
  })

  useHandleNewUser(data)

  return {
    ...getMe(data),
    refetchMe: async () => getMe((await refetch())?.data),
    ...rest,
  }
}
export const useVerifyUserNameIsUniqueQuery = (
  variables: { name: string },
  skip?: boolean,
) =>
  useQuery(
    graphql(/* GraphQL */ `
      query VerifyUserNameIsUnique($name: String!) {
        verifyUserNameIsUnique(name: $name)
      }
    `),
    { variables, skip },
  )

export const useUpdateUserMutation = () => {
  const [updateUser, mutationData] = useMutation(
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
    updateUser: async (
      data: UpdateUserInput,
      onCompletedCallback?: () => void,
    ) =>
      await updateUser({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
      }),
    ...mutationData,
  }
}

export const useChangeUserRoleMutation = () => {
  const [changeUserRole, mutationData] = useMutation(
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
    ...mutationData,
  }
}

export const useDeleteUserMutation = () => {
  const [deleteUser, mutationData] = useMutation(
    graphql(/* GraphQL */ `
      mutation DeleteUser($data: UserIdInput!) {
        deleteUser(data: $data) {
          id
        }
      }
    `),
    { refetchQueries: [{ query: ME_QUERY }] },
  )

  return {
    deleteUser: async (
      data: { userId: string },
      onCompletedCallback?: () => void,
    ) =>
      await deleteUser({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        refetchQueries: [{ query: ME_QUERY }, { query: AdminTermsQuery }],
      }),
    ...mutationData,
  }
}
