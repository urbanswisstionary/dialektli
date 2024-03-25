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

export type CreateExpressionExampleInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
  definition: Scalars['String']['input'];
  expressionId: Scalars['String']['input'];
};

export type CreateExpressionInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
  definition?: InputMaybe<Scalars['String']['input']>;
  example?: InputMaybe<Scalars['String']['input']>;
  exampleCantons?: InputMaybe<Array<Scalars['String']['input']>>;
  gender?: InputMaybe<ExpressionGender>;
  language?: InputMaybe<Language>;
  synonymId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<ExpressionType>;
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteExpressionExampleInput = {
  exampleId: Scalars['String']['input'];
};

export type Dislike = {
  __typename?: 'Dislike';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  expression: Expression;
  expressionId: Scalars['ID']['output'];
};

export type Expression = {
  __typename?: 'Expression';
  author: User;
  cantons: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  definition?: Maybe<Scalars['String']['output']>;
  dislikedByMe: Scalars['Boolean']['output'];
  dislikes: Array<Dislike>;
  dislikesCount: Scalars['Int']['output'];
  examples: Array<ExpressionExample>;
  flagged: Array<Flag>;
  flaggedByMe: Scalars['Boolean']['output'];
  gender?: Maybe<ExpressionGender>;
  id: Scalars['ID']['output'];
  language: Language;
  likedByMe: Scalars['Boolean']['output'];
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  /** the expressions that the parent expression is a synonym of */
  synonymOf: Array<Synonym>;
  /** synonyms of the parent expression */
  synonyms: Array<Synonym>;
  title: Scalars['String']['output'];
  type?: Maybe<ExpressionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpressionActionInput = {
  dislike?: InputMaybe<Scalars['Boolean']['input']>;
  expressionId: Scalars['String']['input'];
  flag?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExpressionExample = {
  __typename?: 'ExpressionExample';
  author: User;
  authorId?: Maybe<Scalars['ID']['output']>;
  cantons: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  definition: Scalars['String']['output'];
  expression: Expression;
  expressionId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum ExpressionGender {
  F = 'F',
  M = 'M',
  N = 'N'
}

export type ExpressionIdInput = {
  expressionId: Scalars['String']['input'];
};

export enum ExpressionType {
  Adjective = 'ADJECTIVE',
  Adverb = 'ADVERB',
  Conjunction = 'CONJUNCTION',
  Interjection = 'INTERJECTION',
  Noun = 'NOUN',
  Particle = 'PARTICLE',
  Preposition = 'PREPOSITION',
  Pronoun = 'PRONOUN',
  Verb = 'VERB'
}

export type ExpressionsQueryInput = {
  authorName?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  firstChar?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Language>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type ExpressionsWithCount = {
  __typename?: 'ExpressionsWithCount';
  count: Scalars['Int']['output'];
  expressions: Array<Expression>;
};

export type Flag = {
  __typename?: 'Flag';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  expression: Expression;
  expressionId: Scalars['ID']['output'];
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
  expression: Expression;
  expressionId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserRole?: Maybe<User>;
  createExpression?: Maybe<Expression>;
  createExpressionExample?: Maybe<ExpressionExample>;
  createUser?: Maybe<User>;
  deleteExpression?: Maybe<Expression>;
  deleteExpressionExample?: Maybe<ExpressionExample>;
  deleteUser?: Maybe<User>;
  expressionAction: Scalars['Boolean']['output'];
  updateExpression?: Maybe<Expression>;
  updateExpressionExample?: Maybe<ExpressionExample>;
  updateUser?: Maybe<User>;
};


export type MutationChangeUserRoleArgs = {
  role: Role;
  userId: Scalars['String']['input'];
};


export type MutationCreateExpressionArgs = {
  data: CreateExpressionInput;
};


export type MutationCreateExpressionExampleArgs = {
  data: CreateExpressionExampleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteExpressionArgs = {
  data: ExpressionIdInput;
};


export type MutationDeleteExpressionExampleArgs = {
  data: DeleteExpressionExampleInput;
};


export type MutationDeleteUserArgs = {
  data: UserIdInput;
};


export type MutationExpressionActionArgs = {
  data: ExpressionActionInput;
};


export type MutationUpdateExpressionArgs = {
  data: UpdateExpressionInput;
};


export type MutationUpdateExpressionExampleArgs = {
  data: UpdateExpressionExampleInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  adminExpressions?: Maybe<ExpressionsWithCount>;
  adminUser: User;
  adminUsers?: Maybe<UsersWithCount>;
  expression?: Maybe<Expression>;
  expressionsQuery?: Maybe<ExpressionsWithCount>;
  me: User;
  verifyUserNameIsUnique: Scalars['Boolean']['output'];
};


export type QueryAdminUserArgs = {
  data: UserIdInput;
};


export type QueryExpressionArgs = {
  data: ExpressionIdInput;
};


export type QueryExpressionsQueryArgs = {
  data: ExpressionsQueryInput;
};


export type QueryVerifyUserNameIsUniqueArgs = {
  name: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Synonym = {
  __typename?: 'Synonym';
  /** synonym of the parent expression */
  synonym: Expression;
  /** the expression that the parent expression is a synonym of */
  synonymOf: Expression;
};

export type UpdateExpressionExampleInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
  definition: Scalars['String']['input'];
  exampleId: Scalars['String']['input'];
};

export type UpdateExpressionInput = {
  cantons?: InputMaybe<Array<Scalars['String']['input']>>;
  definition?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<ExpressionGender>;
  id: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ExpressionType>;
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
  expressions: Array<Expression>;
  flags: Array<Flag>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  myPublishedExpressionsCount: Scalars['Int']['output'];
  myUnpublishedExpressionsCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type UserIdInput = {
  userId: Scalars['String']['input'];
};

export type UsersWithCount = {
  __typename?: 'UsersWithCount';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type ExpressionExampleFragmentFragment = { __typename?: 'ExpressionExample', id: string, definition: string, cantons: Array<string>, createdAt: string, authorId?: string | null, expression: { __typename?: 'Expression', id: string, title: string } } & { ' $fragmentName'?: 'ExpressionExampleFragmentFragment' };

export type ExpressionFragmentFragment = { __typename?: 'Expression', id: string, title: string, definition?: string | null, published: boolean, likesCount: number, likedByMe: boolean, dislikesCount: number, dislikedByMe: boolean, flaggedByMe: boolean, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, type?: ExpressionType | null, gender?: ExpressionGender | null, author: { __typename?: 'User', id: string, name: string, image?: string | null }, examples: Array<(
    { __typename?: 'ExpressionExample' }
    & { ' $fragmentRefs'?: { 'ExpressionExampleFragmentFragment': ExpressionExampleFragmentFragment } }
  )>, synonyms: Array<{ __typename?: 'Synonym', synonymOf: { __typename?: 'Expression', id: string, title: string, cantons: Array<string> } }> } & { ' $fragmentName'?: 'ExpressionFragmentFragment' };

export type ExpressionsQueryQueryVariables = Exact<{
  data: ExpressionsQueryInput;
}>;


export type ExpressionsQueryQuery = { __typename?: 'Query', expressionsQuery?: { __typename?: 'ExpressionsWithCount', count: number, expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
    )> } | null };

export type AdminExpressionFragmentFragment = { __typename?: 'Expression', id: string, title: string, definition?: string | null, published: boolean, likesCount: number, dislikesCount: number, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, type?: ExpressionType | null, gender?: ExpressionGender | null, author: { __typename?: 'User', id: string, name: string, image?: string | null }, examples: Array<(
    { __typename?: 'ExpressionExample' }
    & { ' $fragmentRefs'?: { 'ExpressionExampleFragmentFragment': ExpressionExampleFragmentFragment } }
  )>, flagged: Array<{ __typename?: 'Flag', authorId: string, createdAt: string }> } & { ' $fragmentName'?: 'AdminExpressionFragmentFragment' };

export type AdminExpressionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminExpressionsQuery = { __typename?: 'Query', adminExpressions?: { __typename?: 'ExpressionsWithCount', count: number, expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
    )> } | null };

export type CreateExpressionMutationVariables = Exact<{
  data: CreateExpressionInput;
}>;


export type CreateExpressionMutation = { __typename?: 'Mutation', createExpression?: (
    { __typename?: 'Expression', id: string }
    & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
  ) | null };

export type UpdateExpressionMutationVariables = Exact<{
  data: UpdateExpressionInput;
}>;


export type UpdateExpressionMutation = { __typename?: 'Mutation', updateExpression?: { __typename?: 'Expression', id: string } | null };

export type DeleteExpressionMutationVariables = Exact<{
  data: ExpressionIdInput;
}>;


export type DeleteExpressionMutation = { __typename?: 'Mutation', deleteExpression?: { __typename?: 'Expression', id: string } | null };

export type ExpressionQueryVariables = Exact<{
  data: ExpressionIdInput;
}>;


export type ExpressionQuery = { __typename?: 'Query', expression?: (
    { __typename?: 'Expression', id: string, synonyms: Array<{ __typename?: 'Synonym', synonymOf: (
        { __typename?: 'Expression' }
        & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
      ) }> }
    & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
  ) | null };

export type ExpressionActionMutationVariables = Exact<{
  data: ExpressionActionInput;
}>;


export type ExpressionActionMutation = { __typename?: 'Mutation', expressionAction: boolean };

export type CreateExpressionExampleMutationVariables = Exact<{
  data: CreateExpressionExampleInput;
}>;


export type CreateExpressionExampleMutation = { __typename?: 'Mutation', createExpressionExample?: { __typename?: 'ExpressionExample', id: string, expressionId: string } | null };

export type UpdateExpressionExampleMutationVariables = Exact<{
  data: UpdateExpressionExampleInput;
}>;


export type UpdateExpressionExampleMutation = { __typename?: 'Mutation', updateExpressionExample?: { __typename?: 'ExpressionExample', id: string, expressionId: string } | null };

export type DeleteExpressionExampleMutationVariables = Exact<{
  data: DeleteExpressionExampleInput;
}>;


export type DeleteExpressionExampleMutation = { __typename?: 'Mutation', deleteExpressionExample?: { __typename?: 'ExpressionExample', id: string, expressionId: string } | null };

export type MeFragmentFragment = { __typename?: 'User', id: string, email: string, name: string, role: Role, image?: string | null, bio?: string | null, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, myPublishedExpressionsCount: number, myUnpublishedExpressionsCount: number, expressions: Array<{ __typename?: 'Expression', id: string, title: string }> } & { ' $fragmentName'?: 'MeFragmentFragment' };

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

export type AdminUserFragmentFragment = { __typename?: 'User', id: string, email: string, emailVerified?: string | null, name: string, bio?: string | null, image?: string | null, role: Role, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, publishedExpressionsCount: number, unpublishedExpressionsCount: number, expressions: Array<(
    { __typename?: 'Expression', id: string }
    & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
  )>, flags: Array<{ __typename?: 'Flag', expressionId: string, createdAt: string }> } & { ' $fragmentName'?: 'AdminUserFragmentFragment' };

export type AdminUserQueryQueryVariables = Exact<{
  data: UserIdInput;
}>;


export type AdminUserQueryQuery = { __typename?: 'Query', adminUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AdminUserFragmentFragment': AdminUserFragmentFragment } }
  ) };

export type AdminUsersFragmentFragment = { __typename?: 'User', id: string, email: string, name: string, role: Role, country?: string | null, canton?: string | null, likesCount: number, dislikesCount: number, publishedExpressionsCount: number, unpublishedExpressionsCount: number } & { ' $fragmentName'?: 'AdminUsersFragmentFragment' };

export type AdminUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminUsersQueryQuery = { __typename?: 'Query', adminUsers?: { __typename?: 'UsersWithCount', count: number, users: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AdminUsersFragmentFragment': AdminUsersFragmentFragment } }
    )> } | null };

export type ExpressionOptionFragmentFragment = { __typename?: 'Expression', id: string, title: string } & { ' $fragmentName'?: 'ExpressionOptionFragmentFragment' };

export type SearchExpressionQueryVariables = Exact<{
  data: ExpressionsQueryInput;
}>;


export type SearchExpressionQuery = { __typename?: 'Query', expressionsQuery?: { __typename?: 'ExpressionsWithCount', expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionOptionFragmentFragment': ExpressionOptionFragmentFragment } }
    )> } | null };

export const ExpressionExampleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ExpressionExampleFragmentFragment, unknown>;
export const ExpressionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ExpressionFragmentFragment, unknown>;
export const MeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<MeFragmentFragment, unknown>;
export const AdminExpressionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<AdminExpressionFragmentFragment, unknown>;
export const AdminUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<AdminUserFragmentFragment, unknown>;
export const AdminUsersFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<AdminUsersFragmentFragment, unknown>;
export const ExpressionOptionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<ExpressionOptionFragmentFragment, unknown>;
export const ExpressionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpressionsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ExpressionsQueryQuery, ExpressionsQueryQueryVariables>;
export const AdminExpressionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminExpressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminExpressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<AdminExpressionsQuery, AdminExpressionsQueryVariables>;
export const CreateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreateExpressionMutation, CreateExpressionMutationVariables>;
export const UpdateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateExpressionMutation, UpdateExpressionMutationVariables>;
export const DeleteExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteExpressionMutation, DeleteExpressionMutationVariables>;
export const ExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ExpressionQuery, ExpressionQueryVariables>;
export const ExpressionActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExpressionAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ExpressionActionMutation, ExpressionActionMutationVariables>;
export const CreateExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}}]} as unknown as DocumentNode<CreateExpressionExampleMutation, CreateExpressionExampleMutationVariables>;
export const UpdateExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}}]} as unknown as DocumentNode<UpdateExpressionExampleMutation, UpdateExpressionExampleMutationVariables>;
export const DeleteExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}}]} as unknown as DocumentNode<DeleteExpressionExampleMutation, DeleteExpressionExampleMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const VerifyUserNameIsUniqueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyUserNameIsUnique"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUserNameIsUnique"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<VerifyUserNameIsUniqueQuery, VerifyUserNameIsUniqueQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const AdminUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminUserQueryQuery, AdminUserQueryQueryVariables>;
export const AdminUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUsersFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<AdminUsersQueryQuery, AdminUsersQueryQueryVariables>;
export const SearchExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionOptionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<SearchExpressionQuery, SearchExpressionQueryVariables>;