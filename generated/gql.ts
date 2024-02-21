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
    "\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    canton\n  }\n": types.PostFragmentFragmentDoc,
    "\n  query PostsQuery($data: PostsQueryInput!) {\n    postsQuery(data: $data) {\n      posts {\n        ...PostFragment\n      }\n      count\n    }\n  }\n": types.PostsQueryDocument,
    "\n  fragment AdminPostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    canton\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n": types.AdminPostFragmentFragmentDoc,
    "\n  query AdminPosts {\n    adminPosts {\n      posts {\n        ...AdminPostFragment\n      }\n      count\n    }\n  }\n": types.AdminPostsDocument,
    "\n      mutation CreatePost($data: CreatePostInput!) {\n        createPost(data: $data) {\n          id\n        }\n      }\n    ": types.CreatePostDocument,
    "\n      mutation UpdatePost($data: UpdatePostInput!) {\n        updatePost(data: $data) {\n          id\n        }\n      }\n    ": types.UpdatePostDocument,
    "\n      mutation DeletePost($data: PostIdInput!) {\n        deletePost(data: $data) {\n          id\n        }\n      }\n    ": types.DeletePostDocument,
    "\n  query Post($data: PostIdInput!) {\n    post(data: $data) {\n      id\n      ...PostFragment\n    }\n  }\n": types.PostDocument,
    "\n      mutation PostAction($data: PostActionInput!) {\n        postAction(data: $data)\n      }\n    ": types.PostActionDocument,
    "\n  query EditPostQuery($id: String!) {\n    post(data: { postId: $id }) {\n      id\n      ...PostFragment\n    }\n  }\n": types.EditPostQueryDocument,
    "\n  fragment PostOptionFragment on Post {\n    id\n    title\n  }\n": types.PostOptionFragmentFragmentDoc,
    "\n      query SearchPosts($data: PostsQueryInput!) {\n        postsQuery(data: $data) {\n          posts {\n            ...PostOptionFragment\n          }\n        }\n      }\n    ": types.SearchPostsDocument,
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
export function graphql(source: "\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    canton\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    likedByMe\n    dislikesCount\n    dislikedByMe\n    flaggedByMe\n\n    createdAt\n    updatedAt\n    canton\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostsQuery($data: PostsQueryInput!) {\n    postsQuery(data: $data) {\n      posts {\n        ...PostFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query PostsQuery($data: PostsQueryInput!) {\n    postsQuery(data: $data) {\n      posts {\n        ...PostFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminPostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    canton\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment AdminPostFragment on Post {\n    id\n    author {\n      id\n      name\n      image\n    }\n    title\n    content\n    examples\n    published\n    likesCount\n    dislikesCount\n    createdAt\n    updatedAt\n    canton\n    flagged {\n      authorId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminPosts {\n    adminPosts {\n      posts {\n        ...AdminPostFragment\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query AdminPosts {\n    adminPosts {\n      posts {\n        ...AdminPostFragment\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreatePost($data: CreatePostInput!) {\n        createPost(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreatePost($data: CreatePostInput!) {\n        createPost(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdatePost($data: UpdatePostInput!) {\n        updatePost(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdatePost($data: UpdatePostInput!) {\n        updatePost(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeletePost($data: PostIdInput!) {\n        deletePost(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeletePost($data: PostIdInput!) {\n        deletePost(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Post($data: PostIdInput!) {\n    post(data: $data) {\n      id\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  query Post($data: PostIdInput!) {\n    post(data: $data) {\n      id\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation PostAction($data: PostActionInput!) {\n        postAction(data: $data)\n      }\n    "): (typeof documents)["\n      mutation PostAction($data: PostActionInput!) {\n        postAction(data: $data)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EditPostQuery($id: String!) {\n    post(data: { postId: $id }) {\n      id\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  query EditPostQuery($id: String!) {\n    post(data: { postId: $id }) {\n      id\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostOptionFragment on Post {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment PostOptionFragment on Post {\n    id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query SearchPosts($data: PostsQueryInput!) {\n        postsQuery(data: $data) {\n          posts {\n            ...PostOptionFragment\n          }\n        }\n      }\n    "): (typeof documents)["\n      query SearchPosts($data: PostsQueryInput!) {\n        postsQuery(data: $data) {\n          posts {\n            ...PostOptionFragment\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;