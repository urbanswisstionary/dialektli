"use client"

import type { ReactNode } from "react"

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"
import { CombinedGraphQLErrors } from "@apollo/client/errors"
import { ErrorLink } from "@apollo/client/link/error"
import { ApolloProvider as ApolloProviderLib } from "@apollo/client/react"

const httpLink = new HttpLink({
  uri: "/api/graphql",
})

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      // oxlint-disable-next-line no-console
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      )
    })
  } else {
    // oxlint-disable-next-line no-console
    console.error(`[Network error]: ${error}`)
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloProviderLib client={client}>{children}</ApolloProviderLib>
}
