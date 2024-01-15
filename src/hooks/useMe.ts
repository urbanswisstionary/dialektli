import { useQuery } from "@apollo/client"
import { MeQuery } from "../../generated/graphql"
import { getFragmentData, graphql } from "../../generated"

export const MeFragment = graphql(/* GraphQL */ `
  fragment MeFragment on User {
    id
    email
    name
    role
  }
`)
export const getMe = (data?: MeQuery) => {
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
