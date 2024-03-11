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
    "\n  fragment ExpressionExampleFragment on ExpressionExample {\n    id\n    definition\n    cantons\n    createdAt\n    expression {\n      id\n      title\n    }\n    authorId\n  }\n": types.ExpressionExampleFragmentFragmentDoc,
    "\n  fragment ExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    language\n    cantons\n\n    synonyms {\n      synonymOf {\n        id\n        title\n        cantons\n      }\n    }\n  }\n": types.ExpressionFragmentFragmentDoc,
    "\n  query ExpressionsQuery($data: ExpressionsQueryInput!) {\n    expressionsQuery(data: $data) {\n      expressions {\n        ...ExpressionFragment\n      }\n      count\n    }\n  }\n": types.ExpressionsQueryDocument,
    "\n  fragment AdminExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    language\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n": types.AdminExpressionFragmentFragmentDoc,
    "\n  query AdminExpressions {\n    adminExpressions {\n      expressions {\n        ...AdminExpressionFragment\n      }\n      count\n    }\n  }\n": types.AdminExpressionsDocument,
    "\n      mutation CreateExpression($data: CreateExpressionInput!) {\n        createExpression(data: $data) {\n          id\n        }\n      }\n    ": types.CreateExpressionDocument,
    "\n      mutation UpdateExpression($data: UpdateExpressionInput!) {\n        updateExpression(data: $data) {\n          id\n        }\n      }\n    ": types.UpdateExpressionDocument,
    "\n      mutation DeleteExpression($data: ExpressionIdInput!) {\n        deleteExpression(data: $data) {\n          id\n        }\n      }\n    ": types.DeleteExpressionDocument,
    "\n  query Expression($data: ExpressionIdInput!) {\n    expression(data: $data) {\n      id\n      ...ExpressionFragment\n      synonyms {\n        synonymOf {\n          ...ExpressionFragment\n        }\n      }\n    }\n  }\n": types.ExpressionDocument,
    "\n      mutation ExpressionAction($data: ExpressionActionInput!) {\n        expressionAction(data: $data)\n      }\n    ": types.ExpressionActionDocument,
    "\n      mutation CreateExpressionExample($data: CreateExpressionExampleInput!) {\n        createExpressionExample(data: $data) {\n          id\n        }\n      }\n    ": types.CreateExpressionExampleDocument,
    "\n      mutation UpdateExpressionExample($data: UpdateExpressionExampleInput!) {\n        updateExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    ": types.UpdateExpressionExampleDocument,
    "\n      mutation DeleteExpressionExample($data: DeleteExpressionExampleInput!) {\n        deleteExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    ": types.DeleteExpressionExampleDocument,
    "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    expressions {\n      id\n      title\n    }\n    myPublishedExpressionsCount\n    myUnpublishedExpressionsCount\n  }\n": types.MeFragmentFragmentDoc,
    "\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n": types.MeDocument,
    "\n      query VerifyUserNameIsUnique($name: String!) {\n        verifyUserNameIsUnique(name: $name)\n      }\n    ": types.VerifyUserNameIsUniqueDocument,
    "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        updateUser(data: $data) {\n          ...MeFragment\n        }\n      }\n    ": types.UpdateUserDocument,
    "\n      mutation ChangeUserRole($userId: String!, $role: Role!) {\n        changeUserRole(userId: $userId, role: $role) {\n          ...MeFragment\n        }\n      }\n    ": types.ChangeUserRoleDocument,
    "\n      mutation DeleteUser($data: UserIdInput!) {\n        deleteUser(data: $data) {\n          id\n        }\n      }\n    ": types.DeleteUserDocument,
    "\n  fragment AdminUserFragment on User {\n    id\n    email\n    emailVerified\n    name\n    bio\n    image\n    role\n    expressions {\n      id\n      ...AdminExpressionFragment\n    }\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n    flags {\n      expressionId\n      createdAt\n    }\n  }\n": types.AdminUserFragmentFragmentDoc,
    "\n      query AdminUserQuery($data: UserIdInput!) {\n        adminUser(data: $data) {\n          ...AdminUserFragment\n        }\n      }\n    ": types.AdminUserQueryDocument,
    "\n  fragment AdminUsersFragment on User {\n    id\n    email\n    name\n    role\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n  }\n": types.AdminUsersFragmentFragmentDoc,
    "\n      query AdminUsersQuery {\n        adminUsers {\n          users {\n            ...AdminUsersFragment\n          }\n          count\n        }\n      }\n    ": types.AdminUsersQueryDocument,
    "\n  fragment ExpressionOptionFragment on Expression {\n    id\n    title\n  }\n": types.ExpressionOptionFragmentFragmentDoc,
    "\n      query SearchExpression($data: ExpressionsQueryInput!) {\n        expressionsQuery(data: $data) {\n          expressions {\n            ...ExpressionOptionFragment\n          }\n        }\n      }\n    ": types.SearchExpressionDocument,
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
export function graphql(source: "\n  fragment ExpressionExampleFragment on ExpressionExample {\n    id\n    definition\n    cantons\n    createdAt\n    expression {\n      id\n      title\n    }\n    authorId\n  }\n"): (typeof documents)["\n  fragment ExpressionExampleFragment on ExpressionExample {\n    id\n    definition\n    cantons\n    createdAt\n    expression {\n      id\n      title\n    }\n    authorId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    language\n    cantons\n\n    synonyms {\n      synonymOf {\n        id\n        title\n        cantons\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    language\n    cantons\n\n    synonyms {\n      synonymOf {\n        id\n        title\n        cantons\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ExpressionsQuery($data: ExpressionsQueryInput!) {\n    expressionsQuery(data: $data) {\n      expressions {\n        ...ExpressionFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query ExpressionsQuery($data: ExpressionsQueryInput!) {\n    expressionsQuery(data: $data) {\n      expressions {\n        ...ExpressionFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    language\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment AdminExpressionFragment on Expression {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    definition\n    examples {\n      ...ExpressionExampleFragment\n    }\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    language\n    cantons\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminExpressions {\n    adminExpressions {\n      expressions {\n        ...AdminExpressionFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query AdminExpressions {\n    adminExpressions {\n      expressions {\n        ...AdminExpressionFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateExpression($data: CreateExpressionInput!) {\n        createExpression(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateExpression($data: CreateExpressionInput!) {\n        createExpression(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateExpression($data: UpdateExpressionInput!) {\n        updateExpression(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateExpression($data: UpdateExpressionInput!) {\n        updateExpression(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteExpression($data: ExpressionIdInput!) {\n        deleteExpression(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteExpression($data: ExpressionIdInput!) {\n        deleteExpression(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Expression($data: ExpressionIdInput!) {\n    expression(data: $data) {\n      id\n      ...ExpressionFragment\n      synonyms {\n        synonymOf {\n          ...ExpressionFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Expression($data: ExpressionIdInput!) {\n    expression(data: $data) {\n      id\n      ...ExpressionFragment\n      synonyms {\n        synonymOf {\n          ...ExpressionFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ExpressionAction($data: ExpressionActionInput!) {\n        expressionAction(data: $data)\n      }\n    "): (typeof documents)["\n      mutation ExpressionAction($data: ExpressionActionInput!) {\n        expressionAction(data: $data)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateExpressionExample($data: CreateExpressionExampleInput!) {\n        createExpressionExample(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateExpressionExample($data: CreateExpressionExampleInput!) {\n        createExpressionExample(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateExpressionExample($data: UpdateExpressionExampleInput!) {\n        updateExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateExpressionExample($data: UpdateExpressionExampleInput!) {\n        updateExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteExpressionExample($data: DeleteExpressionExampleInput!) {\n        deleteExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteExpressionExample($data: DeleteExpressionExampleInput!) {\n        deleteExpressionExample(data: $data) {\n          id\n          expressionId\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    expressions {\n      id\n      title\n    }\n    myPublishedExpressionsCount\n    myUnpublishedExpressionsCount\n  }\n"): (typeof documents)["\n  fragment MeFragment on User {\n    id\n    email\n    name\n    role\n    image\n    bio\n    country\n    canton\n    likesCount\n    dislikesCount\n    expressions {\n      id\n      title\n    }\n    myPublishedExpressionsCount\n    myUnpublishedExpressionsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...MeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query VerifyUserNameIsUnique($name: String!) {\n        verifyUserNameIsUnique(name: $name)\n      }\n    "): (typeof documents)["\n      query VerifyUserNameIsUnique($name: String!) {\n        verifyUserNameIsUnique(name: $name)\n      }\n    "];
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
export function graphql(source: "\n  fragment AdminUserFragment on User {\n    id\n    email\n    emailVerified\n    name\n    bio\n    image\n    role\n    expressions {\n      id\n      ...AdminExpressionFragment\n    }\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n    flags {\n      expressionId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment AdminUserFragment on User {\n    id\n    email\n    emailVerified\n    name\n    bio\n    image\n    role\n    expressions {\n      id\n      ...AdminExpressionFragment\n    }\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n    flags {\n      expressionId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query AdminUserQuery($data: UserIdInput!) {\n        adminUser(data: $data) {\n          ...AdminUserFragment\n        }\n      }\n    "): (typeof documents)["\n      query AdminUserQuery($data: UserIdInput!) {\n        adminUser(data: $data) {\n          ...AdminUserFragment\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminUsersFragment on User {\n    id\n    email\n    name\n    role\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n  }\n"): (typeof documents)["\n  fragment AdminUsersFragment on User {\n    id\n    email\n    name\n    role\n    country\n    canton\n    likesCount\n    dislikesCount\n    publishedExpressionsCount: myPublishedExpressionsCount\n    unpublishedExpressionsCount: myUnpublishedExpressionsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query AdminUsersQuery {\n        adminUsers {\n          users {\n            ...AdminUsersFragment\n          }\n          count\n        }\n      }\n    "): (typeof documents)["\n      query AdminUsersQuery {\n        adminUsers {\n          users {\n            ...AdminUsersFragment\n          }\n          count\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ExpressionOptionFragment on Expression {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment ExpressionOptionFragment on Expression {\n    id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query SearchExpression($data: ExpressionsQueryInput!) {\n        expressionsQuery(data: $data) {\n          expressions {\n            ...ExpressionOptionFragment\n          }\n        }\n      }\n    "): (typeof documents)["\n      query SearchExpression($data: ExpressionsQueryInput!) {\n        expressionsQuery(data: $data) {\n          expressions {\n            ...ExpressionOptionFragment\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;