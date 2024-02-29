import { graphql } from "@@/generated"
import {
  CreateTermInput,
  TermsQueryInput,
  UpdateTermInput,
} from "@@/generated/graphql"
import { useMutation, useQuery } from "@apollo/client"

export const TermFragment = graphql(/* GraphQL */ `
  fragment TermFragment on Term {
    id
    author {
      id
      name
      image
    }
    title
    content
    examples
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
  }
`)

const TermsQuery = graphql(/* GraphQL */ `
  query TermsQuery($data: TermsQueryInput!) {
    termsQuery(data: $data) {
      terms {
        ...TermFragment
      }
      count
    }
  }
`)

export const useTermsQuery = (data: TermsQueryInput) =>
  useQuery(TermsQuery, { variables: { data } })

export const AdminTermFragment = graphql(/* GraphQL */ `
  fragment AdminTermFragment on Term {
    id
    author {
      id
      name
      image
    }
    title
    content
    examples
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

export const AdminTermsQuery = graphql(/* GraphQL */ `
  query AdminTerms {
    adminTerms {
      terms {
        ...AdminTermFragment
      }
      count
    }
  }
`)

export const useAdminTermsQuery = () => useQuery(AdminTermsQuery)

export const useCreateTermMutation = () => {
  const [createTerm, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation CreateTerm($data: CreateTermInput!) {
        createTerm(data: $data) {
          id
        }
      }
    `),
  )

  return {
    createTerm: (
      data: CreateTermInput,
      onCompletedCallback?: (_termId?: string) => void,
    ) =>
      createTerm({
        variables: { data },
        onCompleted: (data) => {
          if (onCompletedCallback) onCompletedCallback(data.createTerm?.id)
        },
        awaitRefetchQueries: true,
        refetchQueries: () =>
          data.authorId
            ? [
                { query: TermsQuery, variables: { data: {} } },
                { query: AdminTermsQuery },
              ]
            : [{ query: TermsQuery, variables: { data: {} } }],
        update: (cache, ctx) => {
          if (data.authorId && ctx.data?.createTerm) {
            cache.modify({
              fields: {
                terms: (_existingTerms = []) => {},
                adminTerms: (_existingTerms = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

export const useUpdateTermMutations = () => {
  const [updateTerm, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation UpdateTerm($data: UpdateTermInput!) {
        updateTerm(data: $data) {
          id
        }
      }
    `),
  )
  return {
    updateTerm: (data: UpdateTermInput, onCompletedCallback?: () => void) =>
      updateTerm({
        variables: { data },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        refetchQueries: [
          { query: TermQuery, variables: { data: { termId: data.id } } },
        ],
        update: (cache, { data }) => {
          if (data?.updateTerm) {
            cache.modify({
              fields: {
                terms: (_existingTerms = []) => {},
                adminTerms: (_existingTerms = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}

export const useDeleteTermMutation = () => {
  const [deleteTerm, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation DeleteTerm($data: TermIdInput!) {
        deleteTerm(data: $data) {
          id
        }
      }
    `),
    {
      awaitRefetchQueries: true,
      refetchQueries: () => [
        { query: TermsQuery, variables: { data: {} } },
        { query: AdminTermsQuery },
      ],
      update: (cache, { data }) => {
        if (data?.deleteTerm) {
          cache.modify({
            fields: {
              terms: (_existingTerms = []) => {},
              adminTerms: (_existingTerms = []) => {},
            },
          })
        }
      },
    },
  )

  return {
    deleteTerm: (termId: string, onCompletedCallback?: () => void) =>
      deleteTerm({
        variables: { data: { termId } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
      }),
    ...mutationResult,
  }
}

const TermQuery = graphql(/* GraphQL */ `
  query Term($data: TermIdInput!) {
    term(data: $data) {
      id
      ...TermFragment
    }
  }
`)

export const useTerm = (termId: string) =>
  useQuery(TermQuery, { variables: { data: { termId } }, skip: !termId })

export const useTermAction = (termId: string) => {
  const [termAction, mutationResult] = useMutation(
    graphql(/* GraphQL */ `
      mutation TermAction($data: TermActionInput!) {
        termAction(data: $data)
      }
    `),
    { refetchQueries: [{ query: TermQuery, variables: { data: { termId } } }] },
  )
  return {
    termAction: (
      action: "like" | "dislike" | "flag",
      onCompletedCallback?: () => void,
    ) =>
      termAction({
        variables: { data: { termId, [action]: true } },
        onCompleted: () => {
          if (onCompletedCallback) onCompletedCallback()
        },
        awaitRefetchQueries: true,
        refetchQueries: () => [
          { query: TermsQuery, variables: { data: {} } },
          { query: AdminTermsQuery },
        ],
        update: (cache, { data }) => {
          if (data?.termAction) {
            cache.modify({
              fields: {
                terms: (_existingTerms = []) => {},
                adminTerms: (_existingTerms = []) => {},
              },
            })
          }
        },
      }),
    ...mutationResult,
  }
}
