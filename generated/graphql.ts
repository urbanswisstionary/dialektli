/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: unknown; output: unknown; }
};

export type CreatePostInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  examples?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Dislike = {
  __typename?: 'Dislike';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  post: Post;
  postId: Scalars['ID']['output'];
};

export type Flag = {
  __typename?: 'Flag';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  post: Post;
  postId: Scalars['ID']['output'];
};

export type Like = {
  __typename?: 'Like';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  post: Post;
  postId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserRole?: Maybe<User>;
  createPost?: Maybe<Post>;
  createUser?: Maybe<User>;
  deletePost?: Maybe<Post>;
  deleteUser?: Maybe<User>;
  postAction: Scalars['Boolean']['output'];
  updatePost?: Maybe<Post>;
  updateUser?: Maybe<User>;
};


export type MutationChangeUserRoleArgs = {
  role: Role;
  userId: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeletePostArgs = {
  data: PostIdInput;
};


export type MutationDeleteUserArgs = {
  data: UserIdInput;
};


export type MutationPostActionArgs = {
  data: PostActionInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  canton?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dislikedByMe: Scalars['Boolean']['output'];
  dislikes: Array<Dislike>;
  dislikesCount: Scalars['Int']['output'];
  examples: Array<Scalars['String']['output']>;
  flagged: Array<Flag>;
  flaggedByMe: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  likedByMe: Scalars['Boolean']['output'];
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostActionInput = {
  dislike?: InputMaybe<Scalars['Boolean']['input']>;
  flag?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
  postId: Scalars['String']['input'];
};

export type PostIdInput = {
  postId: Scalars['String']['input'];
};

export type PostsWithCount = {
  __typename?: 'PostsWithCount';
  count: Scalars['Int']['output'];
  posts: Array<Post>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsWithCount?: Maybe<PostsWithCount>;
  user: User;
  users: Array<User>;
};


export type QueryPostArgs = {
  data: PostIdInput;
};


export type QueryPostsArgs = {
  q?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsWithCountArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdatePostInput = {
  canton?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  examples?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  canton?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  dislikes: Array<Dislike>;
  dislikesCount: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  flags: Array<Flag>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  myPublishedPostsCount: Scalars['Int']['output'];
  myUnpublishedPostsCount: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
  role: Role;
};

export type UserIdInput = {
  userId: Scalars['String']['input'];
};

export type MeFragmentFragment = { __typename?: 'User', id: string, email: string, name?: string | null, role: Role, image?: string | null, bio?: string | null, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, myPublishedPostsCount: number, myUnpublishedPostsCount: number, posts: Array<{ __typename?: 'Post', id: string, title: string }> } & { ' $fragmentName'?: 'MeFragmentFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
  ) };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
  ) | null };

export type ChangeUserRoleMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  role: Role;
}>;


export type ChangeUserRoleMutation = { __typename?: 'Mutation', changeUserRole?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
  ) | null };

export type PostsQueryQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostsQueryQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string }> | null };

export type PostFragmentFragment = { __typename?: 'Post', id: string, title: string, content?: string | null, examples: Array<string>, published: boolean, likesCount: number, likedByMe: boolean, dislikesCount: number, dislikedByMe: boolean, flaggedByMe: boolean, author: { __typename?: 'User', id: string, name?: string | null, image?: string | null } } & { ' $fragmentName'?: 'PostFragmentFragment' };

export type PostsQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', postsWithCount?: { __typename?: 'PostsWithCount', count: number, posts: Array<(
      { __typename?: 'Post' }
      & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
    )> } | null };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string } | null };

export type PostQueryVariables = Exact<{
  data: PostIdInput;
}>;


export type PostQuery = { __typename?: 'Query', post?: (
    { __typename?: 'Post', id: string }
    & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
  ) | null };

export type PostActionMutationVariables = Exact<{
  data: PostActionInput;
}>;


export type PostActionMutation = { __typename?: 'Mutation', postAction: boolean };

export const MeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedPostsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedPostsCount"}}]}}]} as unknown as DocumentNode<MeFragmentFragment, unknown>;
export const PostFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}}]}}]} as unknown as DocumentNode<PostFragmentFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedPostsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedPostsCount"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedPostsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedPostsCount"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedPostsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedPostsCount"}}]}}]} as unknown as DocumentNode<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const PostsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<PostsQueryQuery, PostsQueryQueryVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsWithCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;
export const PostActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<PostActionMutation, PostActionMutationVariables>;