"use client"

import { graphql } from "@/generated"
import {
  CreateExpressionExampleInput,
  UpdateExpressionExampleInput,
  CreateExpressionInput,
  ExpressionsQueryInput,
  UpdateExpressionInput,
  Expression,
} from "@/generated/graphql"
import { useMutation, useQuery } from "@apollo/client/react"

export const ExpressionExampleFragment = graphql(/* GraphQL */ `
  fragment ExpressionExampleFragment on ExpressionExample {
    id
    definition
    cantons
    createdAt
    expression {
      id
      title
    }
    authorId
  }
`)
export const ExpressionFragment = graphql(/* GraphQL */ `
  fragment ExpressionFragment on Expression {
    id
    author {
      id
      name
      image
    }
    title
    definition
    examples {
      ...ExpressionExampleFragment
    }
    published
    likesCount
    likedByMe
    dislikesCount
    dislikedByMe
    flaggedByMe
    bookmarkedByMe

    createdAt
    updatedAt
    language
    cantons

    synonyms {
      synonymOf {
        id
        title
        cantons
      }
    }
    type
    gender
  }
`)

const ExpressionsQuery = graphql(/* GraphQL */ `
  query ExpressionsQuery($data: ExpressionsQueryInput!) {
    expressionsQuery(data: $data) {
      expressions {
        ...ExpressionFragment
      }
      count
    }
  }
`)

export const useExpressionsQuery = (data: ExpressionsQueryInput) =>
  useQuery(ExpressionsQuery, { variables: { data } })

export const AdminExpressionFragment = graphql(/* GraphQL */ `
  fragment AdminExpressionFragment on Expression {
    id
    author {
      id
      name
      image
    }
    title
    definition
    examples {
      ...ExpressionExampleFragment
    }
    published
    likesCount
    dislikesCount
    createdAt
    updatedAt
    language
    cantons
    flagged {
      authorId
      createdAt
    }
    type
    gender
  }
`)

export const AdminExpressionsQuery = graphql(/* GraphQL */ `
  query AdminExpressions {
    adminExpressions {
      expressions {
        ...AdminExpressionFragment
      }
      count
    }
  }
`)

export const useAdminExpressionsQuery = () => useQuery(AdminExpressionsQuery)

const MyBookmarksQuery = graphql(/* GraphQL */ `
  query MyBookmarks {
    myBookmarks {
      expressions {
        ...ExpressionFragment
      }
      count
    }
  }
`)

export const useMyBookmarksQuery = () => useQuery(MyBookmarksQuery)

export const useCreateExpressionMutation = () => {
  const [createExpression, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreateExpression($data: CreateExpressionInput!) {
        createExpression(data: $data) {
          __typename
          ... on MutationCreateExpressionSuccess {
            data {
              id
              ...AdminExpressionFragment
            }
          }
          ... on BaseError {
            message
          }
          ... on ValidationError {
            message
            issues {
              message
              path
            }
          }
        }
      }
    `),
  )

  return {
    createExpression: (
      data: CreateExpressionInput,
      onCompletedCallback?: (_expressionId?: string) => void,
    ) =>
      createExpression({
        variables: { data },
        onCompleted: (data) => {
          if (
            onCompletedCallback &&
            data.createExpression?.__typename ===
              "MutationCreateExpressionSuccess"
          )
            onCompletedCallback(data.createExpression.data.id)
        },
        update: (cache, { data }) => {
          if (
            data?.createExpression?.__typename ===
            "MutationCreateExpressionSuccess"
          ) {
            const newExpression = data.createExpression.data
            cache.modify({
              fields: {
                expressionsQuery: (existingExpressions) => ({
                  ...existingExpressions,
                  expressions: [
                    newExpression,
                    ...existingExpressions.expressions,
                  ],
                  count: existingExpressions.count + 1,
                }),
                adminExpressions: (existingExpressions) => ({
                  ...existingExpressions,
                  expressions: [
                    newExpression,
                    ...existingExpressions.expressions,
                  ],
                  count: existingExpressions.count + 1,
                }),
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

export const useUpdateExpressionMutation = () => {
  const [updateExpression, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateExpression($data: UpdateExpressionInput!) {
        updateExpression(data: $data) {
          __typename
          ... on MutationUpdateExpressionSuccess {
            data {
              id
            }
          }
          ... on BaseError {
            message
          }
          ... on ValidationError {
            message
            issues {
              message
              path
            }
          }
        }
      }
    `),
  )
  return {
    updateExpression: (
      data: UpdateExpressionInput,
      onCompletedCallback?: () => void,
    ) =>
      updateExpression({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        refetchQueries: ({ data }) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId:
                  data?.updateExpression?.__typename ===
                  "MutationUpdateExpressionSuccess"
                    ? data.updateExpression.data.id
                    : null,
              },
            },
          },
        ],
      }),
    ...mutationResult,
  }
}

export const useDeleteExpressionMutation = () => {
  const [deleteExpression, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation DeleteExpression($data: ExpressionIdInput!) {
        deleteExpression(data: $data) {
          __typename
          ... on MutationDeleteExpressionSuccess {
            data {
              id
            }
          }
          ... on BaseError {
            message
          }
        }
      }
    `),
  )

  return {
    deleteExpression: (
      expressionId: string,
      onCompletedCallback?: () => void,
    ) =>
      deleteExpression({
        variables: { data: { expressionId } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        update: (cache, { data }) => {
          if (
            data?.deleteExpression?.__typename ===
            "MutationDeleteExpressionSuccess"
          ) {
            const deletedId = data.deleteExpression.data.id
            cache.modify({
              fields: {
                expressionsQuery: (existingExpressions, { readField }) => ({
                  ...existingExpressions,
                  expressions: existingExpressions.expressions.filter(
                    (e: Expression) => readField("id", e) !== deletedId,
                  ),
                  count: existingExpressions.count - 1,
                }),
                adminExpressions: (existingExpressions, { readField }) => ({
                  ...existingExpressions,
                  expressions: existingExpressions.expressions.filter(
                    (e: Expression) => readField("id", e) !== deletedId,
                  ),
                  count: existingExpressions.count - 1,
                }),
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

const ExpressionQuery = graphql(/* GraphQL */ `
  query Expression($data: ExpressionIdInput!) {
    expression(data: $data) {
      id
      ...ExpressionFragment
      synonyms {
        synonymOf {
          ...ExpressionFragment
        }
      }
    }
  }
`)

export const useExpression = (expressionId: string, skip?: boolean) =>
  useQuery(ExpressionQuery, { variables: { data: { expressionId } }, skip })

export const useExpressionAction = (expressionId: string) => {
  const [expressionAction, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation ExpressionAction($data: ExpressionActionInput!) {
        expressionAction(data: $data) {
          __typename
          ... on MutationExpressionActionSuccess {
            data
          }
          ... on BaseError {
            message
          }
        }
      }
    `),
  )
  return {
    expressionAction: (
      action: "like" | "dislike" | "flag" | "bookmark",
      onCompletedCallback?: () => void,
    ) =>
      expressionAction({
        variables: { data: { expressionId, [action]: true } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: () => [
          { query: ExpressionQuery, variables: { data: { expressionId } } },
        ],
      }),
    ...mutationResult,
  }
}

export const useCreateExpressionExampleMutation = () => {
  const [createExpressionExample, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreateExpressionExample($data: CreateExpressionExampleInput!) {
        createExpressionExample(data: $data) {
          __typename
          ... on MutationCreateExpressionExampleSuccess {
            data {
              id
              expressionId
            }
          }
          ... on BaseError {
            message
          }
          ... on ValidationError {
            message
            issues {
              message
              path
            }
          }
        }
      }
    `),
  )

  return {
    createExpressionExample: (
      data: CreateExpressionExampleInput,
      onCompletedCallback?: () => void,
    ) =>
      createExpressionExample({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: ({ data }) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId:
                  data?.createExpressionExample?.__typename ===
                  "MutationCreateExpressionExampleSuccess"
                    ? data.createExpressionExample.data.expressionId
                    : null,
              },
            },
            skip:
              data?.createExpressionExample?.__typename !==
              "MutationCreateExpressionExampleSuccess",
          },
        ],
      }),
    ...mutationResult,
  }
}

export const useUpdateExpressionExampleMutation = () => {
  const [updateExpressionExample, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateExpressionExample($data: UpdateExpressionExampleInput!) {
        updateExpressionExample(data: $data) {
          __typename
          ... on MutationUpdateExpressionExampleSuccess {
            data {
              id
              expressionId
            }
          }
          ... on BaseError {
            message
          }
          ... on ValidationError {
            message
            issues {
              message
              path
            }
          }
        }
      }
    `),
  )

  return {
    updateExpressionExample: (
      data: UpdateExpressionExampleInput,
      onCompletedCallback?: () => void,
    ) =>
      updateExpressionExample({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: ({ data }) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId:
                  data?.updateExpressionExample?.__typename ===
                  "MutationUpdateExpressionExampleSuccess"
                    ? data.updateExpressionExample.data.expressionId
                    : null,
              },
            },
            skip:
              data?.updateExpressionExample?.__typename !==
              "MutationUpdateExpressionExampleSuccess",
          },
        ],
      }),
    ...mutationResult,
  }
}

export const useDeleteExpressionExampleMutation = () => {
  const [deleteExpressionExample, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation DeleteExpressionExample($data: DeleteExpressionExampleInput!) {
        deleteExpressionExample(data: $data) {
          __typename
          ... on MutationDeleteExpressionExampleSuccess {
            data {
              id
              expressionId
            }
          }
          ... on BaseError {
            message
          }
        }
      }
    `),
  )

  return {
    deleteExpressionExample: (
      exampleId: string,
      onCompletedCallback?: () => void,
    ) =>
      deleteExpressionExample({
        variables: { data: { exampleId } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: ({ data }) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId:
                  data?.deleteExpressionExample?.__typename ===
                  "MutationDeleteExpressionExampleSuccess"
                    ? data.deleteExpressionExample.data.expressionId
                    : null,
              },
            },
            skip:
              data?.deleteExpressionExample?.__typename !==
              "MutationDeleteExpressionExampleSuccess",
          },
        ],
      }),
    ...mutationResult,
  }
}
