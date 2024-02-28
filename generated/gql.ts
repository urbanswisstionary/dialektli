/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    terms {\n      id\n      title\n    }\n    myPublishedTermsCount\n    myUnpublishedTermsCount\n  }\n": types.MeFragmentFragmentDoc,
    "\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n": types.MeDocument,
    "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        updateUser(data: $data) {\n          ...MeFragment\n        }\n      }\n    ": types.UpdateUserDocument,
    "\n      mutation ChangeUserRole($userId: String!, $role: Role!) {\n        changeUserRole(userId: $userId, role: $role) {\n          ...MeFragment\n        }\n      }\n    ": types.ChangeUserRoleDocument,
    "\n      mutation DeleteUser($data: UserIdInput!) {\n        deleteUser(data: $data) {\n          id\n        }\n      }\n    ": types.DeleteUserDocument,
    "\n  fragment TermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    cantons\n  }\n": types.TermFragmentFragmentDoc,
    "\n  query TermsQuery($data: TermsQueryInput!) {\n    termsQuery(data: $data) {\n      terms {\n        ...TermFragment\n      }\n      count\n    }\n  }\n": types.TermsQueryDocument,
    "\n  fragment AdminTermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n": types.AdminTermFragmentFragmentDoc,
    "\n  query AdminTerms {\n    adminTerms {\n      terms {\n        ...AdminTermFragment\n      }\n      count\n    }\n  }\n": types.AdminTermsDocument,
    "\n      mutation CreateTerm($data: CreateTermInput!) {\n        createTerm(data: $data) {\n          id\n        }\n      }\n    ": types.CreateTermDocument,
    "\n      mutation UpdateTerm($data: UpdateTermInput!) {\n        updateTerm(data: $data) {\n          id\n        }\n      }\n    ": types.UpdateTermDocument,
    "\n      mutation DeleteTerm($data: TermIdInput!) {\n        deleteTerm(data: $data) {\n          id\n        }\n      }\n    ": types.DeleteTermDocument,
    "\n  query Term($data: TermIdInput!) {\n    term(data: $data) {\n      id\n      ...TermFragment\n    }\n  }\n": types.TermDocument,
    "\n      mutation TermAction($data: TermActionInput!) {\n        termAction(data: $data)\n      }\n    ": types.TermActionDocument,
    "\n  fragment TermOptionFragment on Term {\n    id\n    title\n  }\n": types.TermOptionFragmentFragmentDoc,
    "\n      query SearchTerm($data: TermsQueryInput!) {\n        termsQuery(data: $data) {\n          terms {\n            ...TermOptionFragment\n          }\n        }\n      }\n    ": types.SearchTermDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    terms {\n      id\n      title\n    }\n    myPublishedTermsCount\n    myUnpublishedTermsCount\n  }\n"): (typeof documents)["\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    terms {\n      id\n      title\n    }\n    myPublishedTermsCount\n    myUnpublishedTermsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        updateUser(data: $data) {\n          ...MeFragment\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateUser($data: UpdateUserInput!) {\n        updateUser(data: $data) {\n          ...MeFragment\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeUserRole($userId: String!, $role: Role!) {\n        changeUserRole(userId: $userId, role: $role) {\n          ...MeFragment\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeUserRole($userId: String!, $role: Role!) {\n        changeUserRole(userId: $userId, role: $role) {\n          ...MeFragment\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteUser($data: UserIdInput!) {\n        deleteUser(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteUser($data: UserIdInput!) {\n        deleteUser(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    cantons\n  }\n"): (typeof documents)["\n  fragment TermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    cantons\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TermsQuery($data: TermsQueryInput!) {\n    termsQuery(data: $data) {\n      terms {\n        ...TermFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query TermsQuery($data: TermsQueryInput!) {\n    termsQuery(data: $data) {\n      terms {\n        ...TermFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminTermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment AdminTermFragment on Term {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminTerms {\n    adminTerms {\n      terms {\n        ...AdminTermFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query AdminTerms {\n    adminTerms {\n      terms {\n        ...AdminTermFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateTerm($data: CreateTermInput!) {\n        createTerm(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateTerm($data: CreateTermInput!) {\n        createTerm(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateTerm($data: UpdateTermInput!) {\n        updateTerm(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateTerm($data: UpdateTermInput!) {\n        updateTerm(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteTerm($data: TermIdInput!) {\n        deleteTerm(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteTerm($data: TermIdInput!) {\n        deleteTerm(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Term($data: TermIdInput!) {\n    term(data: $data) {\n      id\n      ...TermFragment\n    }\n  }\n"): (typeof documents)["\n  query Term($data: TermIdInput!) {\n    term(data: $data) {\n      id\n      ...TermFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation TermAction($data: TermActionInput!) {\n        termAction(data: $data)\n      }\n    "): (typeof documents)["\n      mutation TermAction($data: TermActionInput!) {\n        termAction(data: $data)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TermOptionFragment on Term {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment TermOptionFragment on Term {\n    id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query SearchTerm($data: TermsQueryInput!) {\n        termsQuery(data: $data) {\n          terms {\n            ...TermOptionFragment\n          }\n        }\n      }\n    "): (typeof documents)["\n      query SearchTerm($data: TermsQueryInput!) {\n        termsQuery(data: $data) {\n          terms {\n            ...TermOptionFragment\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;