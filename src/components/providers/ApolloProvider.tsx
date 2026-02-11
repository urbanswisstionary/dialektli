"use client"

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { ApolloProvider as ApolloProviderLib } from "@apollo/client/react"
import type { ReactNode } from "react"

const httpLink = new HttpLink({
  uri: "/api/graphql",
})

const errorLink = onError((errorResponse) => {
  const errors = (errorResponse as any).graphQLErrors
  const networkErr = (errorResponse as any).networkError

  if (errors) {
    errors.forEach((error: any) => {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${JSON.stringify(error.locations)}, Path: ${error.path}`,
      )
    })
  }
  if (networkErr) console.error(`[Network error]: ${networkErr}`)
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloProviderLib client={client}>{children}</ApolloProviderLib>
}
