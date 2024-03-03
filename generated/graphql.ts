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

export type CreateTermInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  examples?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Language>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Dislike = {
  __typename?: 'Dislike';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  term: Term;
  termId: Scalars['ID']['output'];
};

export type Flag = {
  __typename?: 'Flag';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  term: Term;
  termId: Scalars['ID']['output'];
};

export enum Language {
  De = 'DE',
  Fr = 'FR',
  It = 'IT'
}

export type Like = {
  __typename?: 'Like';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  term: Term;
  termId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserRole?: Maybe<User>;
  createTerm?: Maybe<Term>;
  createUser?: Maybe<User>;
  deleteTerm?: Maybe<Term>;
  deleteUser?: Maybe<User>;
  termAction: Scalars['Boolean']['output'];
  updateTerm?: Maybe<Term>;
  updateUser?: Maybe<User>;
};


export type MutationChangeUserRoleArgs = {
  role: Role;
  userId: Scalars['String']['input'];
};


export type MutationCreateTermArgs = {
  data: CreateTermInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteTermArgs = {
  data: TermIdInput;
};


export type MutationDeleteUserArgs = {
  data: UserIdInput;
};


export type MutationTermActionArgs = {
  data: TermActionInput;
};


export type MutationUpdateTermArgs = {
  data: UpdateTermInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  adminTerms?: Maybe<TermsWithCount>;
  adminUser: User;
  adminUsers?: Maybe<UsersWithCount>;
  me: User;
  term?: Maybe<Term>;
  termsQuery?: Maybe<TermsWithCount>;
  verifyUserNameIsUnique: Scalars['Boolean']['output'];
};


export type QueryAdminUserArgs = {
  data: UserIdInput;
};


export type QueryTermArgs = {
  data: TermIdInput;
};


export type QueryTermsQueryArgs = {
  data: TermsQueryInput;
};


export type QueryVerifyUserNameIsUniqueArgs = {
  name: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Term = {
  __typename?: 'Term';
  author: User;
  cantons: Array<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dislikedByMe: Scalars['Boolean']['output'];
  dislikes: Array<Dislike>;
  dislikesCount: Scalars['Int']['output'];
  examples: Array<Scalars['String']['output']>;
  flagged: Array<Flag>;
  flaggedByMe: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  language: Language;
  likedByMe: Scalars['Boolean']['output'];
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TermActionInput = {
  dislike?: InputMaybe<Scalars['Boolean']['input']>;
  flag?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
  termId: Scalars['String']['input'];
};

export type TermIdInput = {
  termId: Scalars['String']['input'];
};

export type TermsQueryInput = {
  authorName?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  firstChar?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Language>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type TermsWithCount = {
  __typename?: 'TermsWithCount';
  count: Scalars['Int']['output'];
  terms: Array<Term>;
};

export type UpdateTermInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
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
  myPublishedTermsCount: Scalars['Int']['output'];
  myUnpublishedTermsCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role: Role;
  terms: Array<Term>;
};

export type UserIdInput = {
  userId: Scalars['String']['input'];
};

export type UsersWithCount = {
  __typename?: 'UsersWithCount';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type MeFragmentFragment = { __typename?: 'User', id: string, email: string, name: string, role: Role, image?: string | null, bio?: string | null, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, myPublishedTermsCount: number, myUnpublishedTermsCount: number, terms: Array<{ __typename?: 'Term', id: string, title: string }> } & { ' $fragmentName'?: 'MeFragmentFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
  ) };

export type VerifyUserNameIsUniqueQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type VerifyUserNameIsUniqueQuery = { __typename?: 'Query', verifyUserNameIsUnique: boolean };

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

export type DeleteUserMutationVariables = Exact<{
  data: UserIdInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: string } | null };

export type TermFragmentFragment = { __typename?: 'Term', id: string, title: string, content?: string | null, examples: Array<string>, published: boolean, likesCount: number, likedByMe: boolean, dislikesCount: number, dislikedByMe: boolean, flaggedByMe: boolean, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, author: { __typename?: 'User', id: string, name: string, image?: string | null } } & { ' $fragmentName'?: 'TermFragmentFragment' };

export type TermsQueryQueryVariables = Exact<{
  data: TermsQueryInput;
}>;


export type TermsQueryQuery = { __typename?: 'Query', termsQuery?: { __typename?: 'TermsWithCount', count: number, terms: Array<(
      { __typename?: 'Term' }
      & { ' $fragmentRefs'?: { 'TermFragmentFragment': TermFragmentFragment } }
    )> } | null };

export type AdminTermFragmentFragment = { __typename?: 'Term', id: string, title: string, content?: string | null, examples: Array<string>, published: boolean, likesCount: number, dislikesCount: number, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, author: { __typename?: 'User', id: string, name: string, image?: string | null }, flagged: Array<{ __typename?: 'Flag', authorId: string, createdAt: string }> } & { ' $fragmentName'?: 'AdminTermFragmentFragment' };

export type AdminTermsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminTermsQuery = { __typename?: 'Query', adminTerms?: { __typename?: 'TermsWithCount', count: number, terms: Array<(
      { __typename?: 'Term' }
      & { ' $fragmentRefs'?: { 'AdminTermFragmentFragment': AdminTermFragmentFragment } }
    )> } | null };

export type CreateTermMutationVariables = Exact<{
  data: CreateTermInput;
}>;


export type CreateTermMutation = { __typename?: 'Mutation', createTerm?: { __typename?: 'Term', id: string } | null };

export type UpdateTermMutationVariables = Exact<{
  data: UpdateTermInput;
}>;


export type UpdateTermMutation = { __typename?: 'Mutation', updateTerm?: { __typename?: 'Term', id: string } | null };

export type DeleteTermMutationVariables = Exact<{
  data: TermIdInput;
}>;


export type DeleteTermMutation = { __typename?: 'Mutation', deleteTerm?: { __typename?: 'Term', id: string } | null };

export type TermQueryVariables = Exact<{
  data: TermIdInput;
}>;


export type TermQuery = { __typename?: 'Query', term?: (
    { __typename?: 'Term', id: string }
    & { ' $fragmentRefs'?: { 'TermFragmentFragment': TermFragmentFragment } }
  ) | null };

export type TermActionMutationVariables = Exact<{
  data: TermActionInput;
}>;


export type TermActionMutation = { __typename?: 'Mutation', termAction: boolean };

export type AdminUserFragmentFragment = { __typename?: 'User', id: string, email: string, emailVerified?: string | null, name: string, bio?: string | null, image?: string | null, role: Role, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, publishedTermsCount: number, unpublishedTermsCount: number, terms: Array<(
    { __typename?: 'Term', id: string }
    & { ' $fragmentRefs'?: { 'AdminTermFragmentFragment': AdminTermFragmentFragment } }
  )>, flags: Array<{ __typename?: 'Flag', termId: string, createdAt: string }> } & { ' $fragmentName'?: 'AdminUserFragmentFragment' };

export type AdminUserQueryQueryVariables = Exact<{
  data: UserIdInput;
}>;


export type AdminUserQueryQuery = { __typename?: 'Query', adminUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AdminUserFragmentFragment': AdminUserFragmentFragment } }
  ) };

export type AdminUsersFragmentFragment = { __typename?: 'User', id: string, email: string, name: string, role: Role, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, publishedTermsCount: number, unpublishedTermsCount: number } & { ' $fragmentName'?: 'AdminUsersFragmentFragment' };

export type AdminUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminUsersQueryQuery = { __typename?: 'Query', adminUsers?: { __typename?: 'UsersWithCount', count: number, users: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AdminUsersFragmentFragment': AdminUsersFragmentFragment } }
    )> } | null };

export type TermOptionFragmentFragment = { __typename?: 'Term', id: string, title: string } & { ' $fragmentName'?: 'TermOptionFragmentFragment' };

export type SearchTermQueryVariables = Exact<{
  data: TermsQueryInput;
}>;


export type SearchTermQuery = { __typename?: 'Query', termsQuery?: { __typename?: 'TermsWithCount', terms: Array<(
      { __typename?: 'Term' }
      & { ' $fragmentRefs'?: { 'TermOptionFragmentFragment': TermOptionFragmentFragment } }
    )> } | null };

export const MeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<MeFragmentFragment, unknown>;
export const TermFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]} as unknown as DocumentNode<TermFragmentFragment, unknown>;
export const AdminTermFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminTermFragmentFragment, unknown>;
export const AdminUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTermFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedTermsCount"},"name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedTermsCount"},"name":{"kind":"Name","value":"myUnpublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminUserFragmentFragment, unknown>;
export const AdminUsersFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedTermsCount"},"name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedTermsCount"},"name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<AdminUsersFragmentFragment, unknown>;
export const TermOptionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TermOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<TermOptionFragmentFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const VerifyUserNameIsUniqueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyUserNameIsUnique"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUserNameIsUnique"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<VerifyUserNameIsUniqueQuery, VerifyUserNameIsUniqueQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const TermsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TermsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TermFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]} as unknown as DocumentNode<TermsQueryQuery, TermsQueryQueryVariables>;
export const AdminTermsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTermFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminTermsQuery, AdminTermsQueryVariables>;
export const CreateTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTerm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTermInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTerm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTermMutation, CreateTermMutationVariables>;
export const UpdateTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTerm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTermInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTerm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTermMutation, UpdateTermMutationVariables>;
export const DeleteTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTerm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTerm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTermMutation, DeleteTermMutationVariables>;
export const TermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Term"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"term"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TermFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]} as unknown as DocumentNode<TermQuery, TermQueryVariables>;
export const TermActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TermAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<TermActionMutation, TermActionMutationVariables>;
export const AdminUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTermFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTermFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedTermsCount"},"name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedTermsCount"},"name":{"kind":"Name","value":"myUnpublishedTermsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminUserQueryQuery, AdminUserQueryQueryVariables>;
export const AdminUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUsersFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedTermsCount"},"name":{"kind":"Name","value":"myPublishedTermsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedTermsCount"},"name":{"kind":"Name","value":"myUnpublishedTermsCount"}}]}}]} as unknown as DocumentNode<AdminUsersQueryQuery, AdminUsersQueryQueryVariables>;
export const SearchTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTerm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TermOptionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TermOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Term"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<SearchTermQuery, SearchTermQueryVariables>;