import { graphql } from "@@/generated"
import {
  CreateExpressionExampleInput,
  UpdateExpressionExampleInput,
  CreateExpressionInput,
  ExpressionsQueryInput,
  UpdateExpressionInput,
} from "@@/generated/graphql"
import { useMutation, useQuery } from "@apollo/client"

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

export const useCreateExpressionMutation = () => {
  const [createExpression, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreateExpression($data: CreateExpressionInput!) {
        createExpression(data: $data) {
          id
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
          if (onCompletedCallback)
            onCompletedCallback(data.createExpression?.id)
        },
        awaitRefetchQueries: true,
        refetchQueries: () => [
          { query: ExpressionsQuery, variables: { data: {} } },
          { query: AdminExpressionsQuery },
        ],
      }),
    ...mutationResult,
  }
}

export const useUpdateExpressionMutations = () => {
  const [updateExpression, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateExpression($data: UpdateExpressionInput!) {
        updateExpression(data: $data) {
          id
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
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: ExpressionsQuery,
            variables: { data: { expressionId: data.id } },
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
          id
        }
      }
    `),
    {
      awaitRefetchQueries: true,
      refetchQueries: () => [
        { query: ExpressionsQuery, variables: { data: {} } },
        { query: AdminExpressionsQuery },
      ],
    },
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
        expressionAction(data: $data)
      }
    `),
  )
  return {
    expressionAction: (
      action: "like" | "dislike" | "flag",
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
          { query: AdminExpressionsQuery },
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
          id
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
        refetchQueries: () => [
          {
            query: ExpressionQuery,
            variables: { data: { expressionId: data.expressionId } },
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
          id
          expressionId
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
        refetchQueries: (res) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId: res.data?.updateExpressionExample?.expressionId,
              },
            },
            skip: !res.data?.updateExpressionExample?.expressionId,
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
          id
          expressionId
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
        refetchQueries: (res) => [
          {
            query: ExpressionQuery,
            variables: {
              data: {
                expressionId: res.data?.deleteExpressionExample?.expressionId,
              },
            },
            skip: !res.data?.deleteExpressionExample?.expressionId,
          },
        ],
      }),
    ...mutationResult,
  }
}
