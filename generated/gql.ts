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
    "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    posts {\n      id\n      title\n    }\n    myPublishedPostsCount\n    myUnpublishedPostsCount\n  }\n": types.MeFragmentFragmentDoc,
    "\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n": types.MeDocument,
    "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        updateUser(data: $data) {\n          ...MeFragment\n        }\n      }\n    ": types.UpdateUserDocument,
    "\n      mutation ChangeUserRole($userId: String!, $role: Role!) {\n        changeUserRole(userId: $userId, role: $role) {\n          ...MeFragment\n        }\n      }\n    ": types.ChangeUserRoleDocument,
    "\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n  }\n": types.PostFragmentFragmentDoc,
    "\n  query PostsQuery($q: String) {\n    posts(q: $q) {\n      id\n      title\n    }\n  }\n": types.PostsQueryDocument,
    "\n  query Posts {\n    posts {\n      ...PostFragment\n    }\n  }\n": types.PostsDocument,
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
export function graphql(source: "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    posts {\n      id\n      title\n    }\n    myPublishedPostsCount\n    myUnpublishedPostsCount\n  }\n"): (typeof documents)["\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    posts {\n      id\n      title\n    }\n    myPublishedPostsCount\n    myUnpublishedPostsCount\n  }\n"];
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
export function graphql(source: "\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostsQuery($q: String) {\n    posts(q: $q) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query PostsQuery($q: String) {\n    posts(q: $q) {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts {\n    posts {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  query Posts {\n    posts {\n      ...PostFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;