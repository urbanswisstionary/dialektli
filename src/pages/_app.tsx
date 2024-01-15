import Providers, { ProviderProps } from "@/providers"
// import { withApolloClient } from "@/providers/Apollo"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { FC } from "react"

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getDataFromTree } from "@apollo/client/react/ssr"
import { NextRouter } from "next/router"
import { PropsWithChildren, useRef, useEffect } from "react"
import withApollo from "next-with-apollo"

const App: FC<AppProps & Pick<ProviderProps, "apollo">> = ({
  Component,
  pageProps, //: { session, ...pageProps },
  apollo,
}) => {
  const router = useRouter()
  return (
    <Providers session={pageProps?.session} apollo={apollo}>
      <Component {...pageProps} />
    </Providers>
  )
}

const withApolloClient = withApollo(
  ({ initialState, router }) => {
    const headerLink = setContext(async (_, { headers }) => {
      return {
        headers: {
          ...headers,
          "accept-language": router?.locale ?? "en",
        },
      }
    })

    const link = ApolloLink.from([
      headerLink,

      new HttpLink({
        uri: `${
          typeof window === "undefined" ? `${process.env.VERCEL_URL}` : ""
        }/api/graphql`,
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

export default withApolloClient(App)
