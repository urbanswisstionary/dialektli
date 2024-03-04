import Providers, { ProviderProps } from "@/providers"
import type { AppProps } from "next/app"
import { FC } from "react"
import { appWithTranslation } from "next-i18next"
import { i18n } from "../../next-i18next.config"

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import { getDataFromTree } from "@apollo/client/react/ssr"
import withApollo from "next-with-apollo"

const App: FC<AppProps & Pick<ProviderProps, "apollo">> = ({
  Component,
  pageProps,
  apollo,
  router,
}) => {
  return (
    <Providers session={pageProps?.session} apollo={apollo} router={router}>
      <Component {...pageProps} />
    </Providers>
  )
}

const withApolloClient = withApollo(
  ({ initialState, router }) => {
    const headerLink = setContext(async (_, { headers }) => ({
      headers: {
        ...headers,
        "accept-language": router?.locale ?? i18n.defaultLocale,
      },
    }))

    const link = ApolloLink.from([
      headerLink,

      new HttpLink({
        uri: `${
          typeof window === "undefined" ? `${process.env.VERCEL_URL}` : ""
        }/api/graphql`,
        credentials: "include",
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

export default withApolloClient(appWithTranslation(App))
