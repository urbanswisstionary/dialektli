/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
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
};

export type Bookmark = {
  __typename?: 'Bookmark';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expression?: Maybe<Expression>;
  expressionId?: Maybe<Scalars['ID']['output']>;
};

export type CantonExpression = {
  __typename?: 'CantonExpression';
  id: Scalars['String']['output'];
  language?: Maybe<Language>;
  title: Scalars['String']['output'];
};

export type CantonExpressionCount = {
  __typename?: 'CantonExpressionCount';
  canton: Scalars['String']['output'];
  count: Scalars['Int']['output'];
};

export type CantonExpressionDetail = {
  __typename?: 'CantonExpressionDetail';
  canton: Scalars['String']['output'];
  expressions: Array<CantonExpression>;
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

export type CreateSemanticGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expressionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  nameDE?: InputMaybe<Scalars['String']['input']>;
  nameFR?: InputMaybe<Scalars['String']['input']>;
  nameIT?: InputMaybe<Scalars['String']['input']>;
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
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expression?: Maybe<Expression>;
  expressionId?: Maybe<Scalars['ID']['output']>;
};

export type Expression = {
  __typename?: 'Expression';
  author?: Maybe<User>;
  bookmarkCount?: Maybe<Scalars['Int']['output']>;
  bookmarkedByMe?: Maybe<Scalars['Boolean']['output']>;
  bookmarks?: Maybe<Array<Bookmark>>;
  cantons?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  definition?: Maybe<Scalars['String']['output']>;
  dislikedByMe?: Maybe<Scalars['Boolean']['output']>;
  dislikes?: Maybe<Array<Dislike>>;
  dislikesCount?: Maybe<Scalars['Int']['output']>;
  examples?: Maybe<Array<ExpressionExample>>;
  flagged?: Maybe<Array<Flag>>;
  flaggedByMe?: Maybe<Scalars['Boolean']['output']>;
  gender?: Maybe<ExpressionGender>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Language>;
  likedByMe?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Array<Like>>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  semanticGroups?: Maybe<Array<SemanticGroup>>;
  /** the expressions that the parent expression is a synonym of */
  synonymOf?: Maybe<Array<Synonym>>;
  /** synonyms of the parent expression */
  synonyms?: Maybe<Array<Synonym>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ExpressionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpressionActionInput = {
  bookmark?: InputMaybe<Scalars['Boolean']['input']>;
  dislike?: InputMaybe<Scalars['Boolean']['input']>;
  expressionId: Scalars['String']['input'];
  flag?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExpressionExample = {
  __typename?: 'ExpressionExample';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  cantons?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  definition?: Maybe<Scalars['String']['output']>;
  expression?: Maybe<Expression>;
  expressionId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
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
  sortByPopularity?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExpressionsWithCount = {
  __typename?: 'ExpressionsWithCount';
  count: Scalars['Int']['output'];
  expressions: Array<Expression>;
};

export type Flag = {
  __typename?: 'Flag';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expression?: Maybe<Expression>;
  expressionId?: Maybe<Scalars['ID']['output']>;
};

export enum Language {
  De = 'DE',
  Fr = 'FR',
  It = 'IT'
}

export type Like = {
  __typename?: 'Like';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expression?: Maybe<Expression>;
  expressionId?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserRole?: Maybe<User>;
  createExpression?: Maybe<Expression>;
  createExpressionExample?: Maybe<ExpressionExample>;
  createSemanticGroup?: Maybe<SemanticGroup>;
  createUser?: Maybe<User>;
  deleteExpression?: Maybe<Expression>;
  deleteExpressionExample?: Maybe<ExpressionExample>;
  deleteSemanticGroup?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<User>;
  expressionAction?: Maybe<Scalars['Boolean']['output']>;
  updateExpression?: Maybe<Expression>;
  updateExpressionExample?: Maybe<ExpressionExample>;
  updateSemanticGroup?: Maybe<SemanticGroup>;
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


export type MutationCreateSemanticGroupArgs = {
  data: CreateSemanticGroupInput;
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


export type MutationDeleteSemanticGroupArgs = {
  id: Scalars['String']['input'];
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


export type MutationUpdateSemanticGroupArgs = {
  data: UpdateSemanticGroupInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  adminExpressions?: Maybe<ExpressionsWithCount>;
  adminUser?: Maybe<User>;
  adminUsers?: Maybe<UsersWithCount>;
  cantonOverview: Array<CantonExpressionCount>;
  expression?: Maybe<Expression>;
  expressionsByCanton: Array<CantonExpression>;
  expressionsQuery?: Maybe<ExpressionsWithCount>;
  me?: Maybe<User>;
  myBookmarks?: Maybe<ExpressionsWithCount>;
  semanticGroupDistribution?: Maybe<SemanticGroupWithDistribution>;
  semanticGroups: Array<SemanticGroup>;
  verifyUserNameIsUnique?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryAdminUserArgs = {
  data: UserIdInput;
};


export type QueryCantonOverviewArgs = {
  language?: InputMaybe<Language>;
};


export type QueryExpressionArgs = {
  data: ExpressionIdInput;
};


export type QueryExpressionsByCantonArgs = {
  canton: Scalars['String']['input'];
  language?: InputMaybe<Language>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryExpressionsQueryArgs = {
  data: ExpressionsQueryInput;
};


export type QuerySemanticGroupDistributionArgs = {
  semanticGroupId: Scalars['String']['input'];
};


export type QuerySemanticGroupsArgs = {
  data?: InputMaybe<SemanticGroupQueryInput>;
};


export type QueryVerifyUserNameIsUniqueArgs = {
  name: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SemanticGroup = {
  __typename?: 'SemanticGroup';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expressionCount?: Maybe<Scalars['Int']['output']>;
  expressions?: Maybe<Array<Expression>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nameDE?: Maybe<Scalars['String']['output']>;
  nameFR?: Maybe<Scalars['String']['output']>;
  nameIT?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SemanticGroupQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type SemanticGroupWithDistribution = {
  __typename?: 'SemanticGroupWithDistribution';
  cantonDistribution: Array<CantonExpressionCount>;
  cantonExpressions: Array<CantonExpressionDetail>;
  semanticGroup: SemanticGroup;
};

export type Synonym = {
  __typename?: 'Synonym';
  /** synonym of the parent expression */
  synonym?: Maybe<Expression>;
  /** the expression that the parent expression is a synonym of */
  synonymOf?: Maybe<Expression>;
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

export type UpdateSemanticGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expressionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  nameDE?: InputMaybe<Scalars['String']['input']>;
  nameFR?: InputMaybe<Scalars['String']['input']>;
  nameIT?: InputMaybe<Scalars['String']['input']>;
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
  dislikes?: Maybe<Array<Dislike>>;
  dislikesCount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  expressions?: Maybe<Array<Expression>>;
  flags?: Maybe<Array<Flag>>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<Like>>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  myPublishedExpressionsCount?: Maybe<Scalars['Int']['output']>;
  myUnpublishedExpressionsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
};

export type UserIdInput = {
  userId: Scalars['String']['input'];
};

export type UsersWithCount = {
  __typename?: 'UsersWithCount';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type CantonOverviewQueryVariables = Exact<{
  language?: InputMaybe<Language>;
}>;


export type CantonOverviewQuery = { __typename?: 'Query', cantonOverview: Array<{ __typename?: 'CantonExpressionCount', canton: string, count: number }> };

export type ExpressionsByCantonQueryVariables = Exact<{
  canton: Scalars['String']['input'];
  language?: InputMaybe<Language>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExpressionsByCantonQuery = { __typename?: 'Query', expressionsByCanton: Array<{ __typename?: 'CantonExpression', id: string, title: string, language?: Language | null }> };

export type ExpressionOptionFragmentFragment = { __typename?: 'Expression', id?: string | null, title?: string | null } & { ' $fragmentName'?: 'ExpressionOptionFragmentFragment' };

export type SearchExpressionQueryVariables = Exact<{
  data: ExpressionsQueryInput;
}>;


export type SearchExpressionQuery = { __typename?: 'Query', expressionsQuery?: { __typename?: 'ExpressionsWithCount', expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionOptionFragmentFragment': ExpressionOptionFragmentFragment } }
    )> } | null };

export type ExpressionExampleFragmentFragment = { __typename?: 'ExpressionExample', id?: string | null, definition?: string | null, cantons?: Array<string> | null, createdAt?: string | null, authorId?: string | null, expression?: { __typename?: 'Expression', id?: string | null, title?: string | null } | null } & { ' $fragmentName'?: 'ExpressionExampleFragmentFragment' };

export type ExpressionFragmentFragment = { __typename?: 'Expression', id?: string | null, title?: string | null, definition?: string | null, published?: boolean | null, likesCount?: number | null, likedByMe?: boolean | null, dislikesCount?: number | null, dislikedByMe?: boolean | null, flaggedByMe?: boolean | null, bookmarkedByMe?: boolean | null, createdAt?: string | null, updatedAt?: string | null, language?: Language | null, cantons?: Array<string> | null, type?: ExpressionType | null, gender?: ExpressionGender | null, author?: { __typename?: 'User', id?: string | null, name?: string | null, image?: string | null } | null, examples?: Array<(
    { __typename?: 'ExpressionExample' }
    & { ' $fragmentRefs'?: { 'ExpressionExampleFragmentFragment': ExpressionExampleFragmentFragment } }
  )> | null, synonyms?: Array<{ __typename?: 'Synonym', synonymOf?: { __typename?: 'Expression', id?: string | null, title?: string | null, cantons?: Array<string> | null } | null }> | null } & { ' $fragmentName'?: 'ExpressionFragmentFragment' };

export type ExpressionsQueryQueryVariables = Exact<{
  data: ExpressionsQueryInput;
}>;


export type ExpressionsQueryQuery = { __typename?: 'Query', expressionsQuery?: { __typename?: 'ExpressionsWithCount', count: number, expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
    )> } | null };

export type AdminExpressionFragmentFragment = { __typename?: 'Expression', id?: string | null, title?: string | null, definition?: string | null, published?: boolean | null, likesCount?: number | null, dislikesCount?: number | null, createdAt?: string | null, updatedAt?: string | null, language?: Language | null, cantons?: Array<string> | null, type?: ExpressionType | null, gender?: ExpressionGender | null, author?: { __typename?: 'User', id?: string | null, name?: string | null, image?: string | null } | null, examples?: Array<(
    { __typename?: 'ExpressionExample' }
    & { ' $fragmentRefs'?: { 'ExpressionExampleFragmentFragment': ExpressionExampleFragmentFragment } }
  )> | null, flagged?: Array<{ __typename?: 'Flag', authorId?: string | null, createdAt?: string | null }> | null } & { ' $fragmentName'?: 'AdminExpressionFragmentFragment' };

export type AdminExpressionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminExpressionsQuery = { __typename?: 'Query', adminExpressions?: { __typename?: 'ExpressionsWithCount', count: number, expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
    )> } | null };

export type MyBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBookmarksQuery = { __typename?: 'Query', myBookmarks?: { __typename?: 'ExpressionsWithCount', count: number, expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
    )> } | null };

export type CreateExpressionMutationVariables = Exact<{
  data: CreateExpressionInput;
}>;


export type CreateExpressionMutation = { __typename?: 'Mutation', createExpression?: (
    { __typename?: 'Expression', id?: string | null }
    & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
  ) | null };

export type UpdateExpressionMutationVariables = Exact<{
  data: UpdateExpressionInput;
}>;


export type UpdateExpressionMutation = { __typename?: 'Mutation', updateExpression?: { __typename?: 'Expression', id?: string | null } | null };

export type DeleteExpressionMutationVariables = Exact<{
  data: ExpressionIdInput;
}>;


export type DeleteExpressionMutation = { __typename?: 'Mutation', deleteExpression?: { __typename?: 'Expression', id?: string | null } | null };

export type ExpressionQueryVariables = Exact<{
  data: ExpressionIdInput;
}>;


export type ExpressionQuery = { __typename?: 'Query', expression?: (
    { __typename?: 'Expression', id?: string | null, synonyms?: Array<{ __typename?: 'Synonym', synonymOf?: (
        { __typename?: 'Expression' }
        & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
      ) | null }> | null }
    & { ' $fragmentRefs'?: { 'ExpressionFragmentFragment': ExpressionFragmentFragment } }
  ) | null };

export type ExpressionActionMutationVariables = Exact<{
  data: ExpressionActionInput;
}>;


export type ExpressionActionMutation = { __typename?: 'Mutation', expressionAction?: boolean | null };

export type CreateExpressionExampleMutationVariables = Exact<{
  data: CreateExpressionExampleInput;
}>;


export type CreateExpressionExampleMutation = { __typename?: 'Mutation', createExpressionExample?: { __typename?: 'ExpressionExample', id?: string | null, expressionId?: string | null } | null };

export type UpdateExpressionExampleMutationVariables = Exact<{
  data: UpdateExpressionExampleInput;
}>;


export type UpdateExpressionExampleMutation = { __typename?: 'Mutation', updateExpressionExample?: { __typename?: 'ExpressionExample', id?: string | null, expressionId?: string | null } | null };

export type DeleteExpressionExampleMutationVariables = Exact<{
  data: DeleteExpressionExampleInput;
}>;


export type DeleteExpressionExampleMutation = { __typename?: 'Mutation', deleteExpressionExample?: { __typename?: 'ExpressionExample', id?: string | null, expressionId?: string | null } | null };

export type MeFragmentFragment = { __typename?: 'User', id?: string | null, email?: string | null, name?: string | null, role?: Role | null, image?: string | null, bio?: string | null, country?: string | null, canton?: string | null, likesCount?: number | null, dislikesCount?: number | null, myPublishedExpressionsCount?: number | null, myUnpublishedExpressionsCount?: number | null, expressions?: Array<{ __typename?: 'Expression', id?: string | null, title?: string | null }> | null } & { ' $fragmentName'?: 'MeFragmentFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
  ) | null };

export type VerifyUserNameIsUniqueQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type VerifyUserNameIsUniqueQuery = { __typename?: 'Query', verifyUserNameIsUnique?: boolean | null };

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


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id?: string | null } | null };

export type AdminUserFragmentFragment = { __typename?: 'User', id?: string | null, email?: string | null, emailVerified?: string | null, name?: string | null, bio?: string | null, image?: string | null, role?: Role | null, country?: string | null, canton?: string | null, likesCount?: number | null, dislikesCount?: number | null, publishedExpressionsCount?: number | null, unpublishedExpressionsCount?: number | null, expressions?: Array<(
    { __typename?: 'Expression', id?: string | null }
    & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
  )> | null, flags?: Array<{ __typename?: 'Flag', expressionId?: string | null, createdAt?: string | null }> | null } & { ' $fragmentName'?: 'AdminUserFragmentFragment' };

export type AdminUserQueryQueryVariables = Exact<{
  data: UserIdInput;
}>;


export type AdminUserQueryQuery = { __typename?: 'Query', adminUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AdminUserFragmentFragment': AdminUserFragmentFragment } }
  ) | null };

export type AdminUsersFragmentFragment = { __typename?: 'User', id?: string | null, email?: string | null, name?: string | null, role?: Role | null, country?: string | null, canton?: string | null, likesCount?: number | null, dislikesCount?: number | null, publishedExpressionsCount?: number | null, unpublishedExpressionsCount?: number | null } & { ' $fragmentName'?: 'AdminUsersFragmentFragment' };

export type AdminUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminUsersQueryQuery = { __typename?: 'Query', adminUsers?: { __typename?: 'UsersWithCount', count: number, users: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AdminUsersFragmentFragment': AdminUsersFragmentFragment } }
    )> } | null };

export const ExpressionOptionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<ExpressionOptionFragmentFragment, unknown>;
export const ExpressionExampleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ExpressionExampleFragmentFragment, unknown>;
export const ExpressionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ExpressionFragmentFragment, unknown>;
export const MeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<MeFragmentFragment, unknown>;
export const AdminExpressionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<AdminExpressionFragmentFragment, unknown>;
export const AdminUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<AdminUserFragmentFragment, unknown>;
export const AdminUsersFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<AdminUsersFragmentFragment, unknown>;
export const CantonOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CantonOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cantonOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CantonOverviewQuery, CantonOverviewQueryVariables>;
export const ExpressionsByCantonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpressionsByCanton"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"canton"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionsByCanton"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"canton"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canton"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]} as unknown as DocumentNode<ExpressionsByCantonQuery, ExpressionsByCantonQueryVariables>;
export const SearchExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionOptionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionOptionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<SearchExpressionQuery, SearchExpressionQueryVariables>;
export const ExpressionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpressionsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ExpressionsQueryQuery, ExpressionsQueryQueryVariables>;
export const AdminExpressionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminExpressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminExpressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<AdminExpressionsQuery, AdminExpressionsQueryVariables>;
export const MyBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<MyBookmarksQuery, MyBookmarksQueryVariables>;
export const CreateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreateExpressionMutation, CreateExpressionMutationVariables>;
export const UpdateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateExpressionMutation, UpdateExpressionMutationVariables>;
export const DeleteExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteExpressionMutation, DeleteExpressionMutationVariables>;
export const ExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ExpressionQuery, ExpressionQueryVariables>;
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