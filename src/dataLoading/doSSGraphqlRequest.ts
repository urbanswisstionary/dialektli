import {
  ApolloClient,
  ApolloLink,
  ApolloQueryResult,
  InMemoryCache,
  OperationVariables,
  QueryOptions,
  createHttpLink,
} from "@apollo/client/core"
import { GetServerSidePropsContext } from "next"
import { setContext } from "@apollo/client/link/context"

export const doSSGraphqlRequest = <
  T = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  options: QueryOptions<TVariables, T>,
  ctx: GetServerSidePropsContext,
): Promise<ApolloQueryResult<T>> => {
  const headerLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      "accept-language": ctx.locale ?? "de",
    },
  }))

  const link = ApolloLink.from([
    headerLink,
    createHttpLink({ uri: `${process.env.VERCEL_URL}/api/graphql` }),
  ])

  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache(),
  })

  return client.query(options)
}
