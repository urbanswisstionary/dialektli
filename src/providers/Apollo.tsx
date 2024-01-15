import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getDataFromTree } from "@apollo/client/react/ssr"
import { NextRouter, useRouter } from "next/router"
import { FC, PropsWithChildren, useRef, useEffect } from "react"
import withApollo from "next-with-apollo"

const ResetApolloOnLangChange: FC<{
  apollo: ApolloClient<unknown>
  router: NextRouter
}> = ({ apollo, router }) => {
  const lastLang = useRef(router?.locale)

  useEffect(() => {
    if (router?.locale !== lastLang.current) {
      apollo.resetStore()
      lastLang.current = router?.locale
    }
  }, [apollo, router?.locale])

  return null
}

export type ApolloClientProviderProps = {
  apollo: ApolloClient<unknown>
}
const ApolloClientProvider: FC<
  PropsWithChildren<ApolloClientProviderProps>
> = ({ children, apollo }) => {
  const router = useRouter()

  return (
    <>
      <ResetApolloOnLangChange apollo={apollo} router={router} />
      <ApolloProvider client={apollo}>{children}</ApolloProvider>
    </>
  )
}

export const withApolloClient = withApollo(
  ({ initialState, router }) => {
    const headerLink = setContext(async (_, { headers }) => {
      return {
        headers: {
          ...headers,
          "accept-language": router?.locale ?? "de",
        },
      }
    })

    const link = ApolloLink.from([
      headerLink,

      new HttpLink({
        uri: `${typeof window === "undefined" ? `${process.env.ROOT_URL}` : ""}/api/graphql`,
        credentials: "include",
        // credentials: 'same-origin',
      }),
    ])

    return new ApolloClient({
      link,
      ssrMode: typeof window === "undefined",
      cache: new InMemoryCache().restore(initialState || {}),
    }) as any
  },
  { getDataFromTree },
)

export default ApolloClientProvider
