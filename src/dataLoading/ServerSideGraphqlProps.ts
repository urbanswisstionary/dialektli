import { doSSGraphqlRequest } from "./doSSGraphqlRequest"
import {
  ApolloQueryResult,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"

import { ZodSchema } from "zod"

export const ServerSideGraphqlProps =
  <
    TData extends { [key: string]: any },
    TParams extends OperationVariables,
    TVariables extends OperationVariables,
    P extends { [key: string]: any } = TData,
  >(options: {
    query: TypedDocumentNode<TData, TVariables>
    variablesSchema?: ZodSchema<TParams>
    transformVariables?: (_p: TParams) => TVariables
    notFound?: (_data: TData) => boolean
    resultToProps?: (
      _data: ApolloQueryResult<TData>,
      _ctx: { variables: TVariables },
    ) => P
  }): GetServerSideProps<P> =>
  async (ctx: GetServerSidePropsContext) => {
    const variablesRaw = options.variablesSchema
      ? options.variablesSchema.parse(ctx.query)
      : undefined
    const variables = (
      variablesRaw
        ? options.transformVariables
          ? options.transformVariables(variablesRaw)
          : variablesRaw
        : undefined
    ) as TVariables
    const result = await doSSGraphqlRequest(
      { query: options.query, variables },
      ctx,
    )
    if (options.notFound?.(result.data)) return { notFound: true }

    if (options.resultToProps)
      return {        props: options.resultToProps(result, { variables }),
      }
    else return { props: result.data } as unknown as GetServerSidePropsResult<P>
  }
