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

export type BaseError = Error & {
  __typename?: 'BaseError';
  message: Scalars['String']['output'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  author: User;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  expression: Expression;
  expressionId: Scalars['ID']['output'];
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

export type Error = {
  message: Scalars['String']['output'];
};

export type Expression = {
  __typename?: 'Expression';
  author?: Maybe<User>;
  bookmarkCount: Scalars['Int']['output'];
  bookmarkedByMe: Scalars['Boolean']['output'];
  bookmarks: Array<Bookmark>;
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
  semanticGroups: Array<SemanticGroup>;
  /** the expressions that the parent expression is a synonym of */
  synonymOf: Array<Synonym>;
  /** synonyms of the parent expression */
  synonyms: Array<Synonym>;
  title: Scalars['String']['output'];
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
  sortByPopularity?: InputMaybe<Scalars['Boolean']['input']>;
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
  changeUserRole: MutationChangeUserRoleResult;
  createExpression: MutationCreateExpressionResult;
  createExpressionExample: MutationCreateExpressionExampleResult;
  createSemanticGroup: MutationCreateSemanticGroupResult;
  deleteExpression: MutationDeleteExpressionResult;
  deleteExpressionExample: MutationDeleteExpressionExampleResult;
  deleteSemanticGroup: MutationDeleteSemanticGroupResult;
  deleteUser: MutationDeleteUserResult;
  expressionAction: MutationExpressionActionResult;
  updateExpression: MutationUpdateExpressionResult;
  updateExpressionExample: MutationUpdateExpressionExampleResult;
  updateSemanticGroup: MutationUpdateSemanticGroupResult;
  updateUser: MutationUpdateUserResult;
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

export type MutationChangeUserRoleResult = BaseError | MutationChangeUserRoleSuccess;

export type MutationChangeUserRoleSuccess = {
  __typename?: 'MutationChangeUserRoleSuccess';
  data: User;
};

export type MutationCreateExpressionExampleResult = BaseError | MutationCreateExpressionExampleSuccess | ValidationError;

export type MutationCreateExpressionExampleSuccess = {
  __typename?: 'MutationCreateExpressionExampleSuccess';
  data: ExpressionExample;
};

export type MutationCreateExpressionResult = BaseError | MutationCreateExpressionSuccess | ValidationError;

export type MutationCreateExpressionSuccess = {
  __typename?: 'MutationCreateExpressionSuccess';
  data: Expression;
};

export type MutationCreateSemanticGroupResult = BaseError | MutationCreateSemanticGroupSuccess;

export type MutationCreateSemanticGroupSuccess = {
  __typename?: 'MutationCreateSemanticGroupSuccess';
  data: SemanticGroup;
};

export type MutationDeleteExpressionExampleResult = BaseError | MutationDeleteExpressionExampleSuccess;

export type MutationDeleteExpressionExampleSuccess = {
  __typename?: 'MutationDeleteExpressionExampleSuccess';
  data: ExpressionExample;
};

export type MutationDeleteExpressionResult = BaseError | MutationDeleteExpressionSuccess;

export type MutationDeleteExpressionSuccess = {
  __typename?: 'MutationDeleteExpressionSuccess';
  data: Expression;
};

export type MutationDeleteSemanticGroupResult = BaseError | MutationDeleteSemanticGroupSuccess;

export type MutationDeleteSemanticGroupSuccess = {
  __typename?: 'MutationDeleteSemanticGroupSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationDeleteUserResult = BaseError | MutationDeleteUserSuccess;

export type MutationDeleteUserSuccess = {
  __typename?: 'MutationDeleteUserSuccess';
  data: User;
};

export type MutationExpressionActionResult = BaseError | MutationExpressionActionSuccess;

export type MutationExpressionActionSuccess = {
  __typename?: 'MutationExpressionActionSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationUpdateExpressionExampleResult = BaseError | MutationUpdateExpressionExampleSuccess | ValidationError;

export type MutationUpdateExpressionExampleSuccess = {
  __typename?: 'MutationUpdateExpressionExampleSuccess';
  data: ExpressionExample;
};

export type MutationUpdateExpressionResult = BaseError | MutationUpdateExpressionSuccess | ValidationError;

export type MutationUpdateExpressionSuccess = {
  __typename?: 'MutationUpdateExpressionSuccess';
  data: Expression;
};

export type MutationUpdateSemanticGroupResult = BaseError | MutationUpdateSemanticGroupSuccess;

export type MutationUpdateSemanticGroupSuccess = {
  __typename?: 'MutationUpdateSemanticGroupSuccess';
  data: SemanticGroup;
};

export type MutationUpdateUserResult = BaseError | MutationUpdateUserSuccess | ValidationError;

export type MutationUpdateUserSuccess = {
  __typename?: 'MutationUpdateUserSuccess';
  data: User;
};

export type Query = {
  __typename?: 'Query';
  adminExpressions?: Maybe<ExpressionsWithCount>;
  adminUser: User;
  adminUsers?: Maybe<UsersWithCount>;
  cantonOverview: Array<CantonExpressionCount>;
  expression?: Maybe<Expression>;
  expressionsByCanton: Array<CantonExpression>;
  expressionsQuery?: Maybe<ExpressionsWithCount>;
  me: User;
  myBookmarks?: Maybe<ExpressionsWithCount>;
  semanticGroupDistribution?: Maybe<SemanticGroupWithDistribution>;
  semanticGroups: Array<SemanticGroup>;
  verifyUserNameIsUnique: Scalars['Boolean']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expressionCount: Scalars['Int']['output'];
  expressions: Array<Expression>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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

export type ValidationError = Error & {
  __typename?: 'ValidationError';
  issues: Array<ZodFieldError>;
  message: Scalars['String']['output'];
};

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
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

export type ExpressionOptionFragmentFragment = { __typename?: 'Expression', id: string, title: string } & { ' $fragmentName'?: 'ExpressionOptionFragmentFragment' };

export type SearchExpressionQueryVariables = Exact<{
  data: ExpressionsQueryInput;
}>;


export type SearchExpressionQuery = { __typename?: 'Query', expressionsQuery?: { __typename?: 'ExpressionsWithCount', expressions: Array<(
      { __typename?: 'Expression' }
      & { ' $fragmentRefs'?: { 'ExpressionOptionFragmentFragment': ExpressionOptionFragmentFragment } }
    )> } | null };

export type ExpressionExampleFragmentFragment = { __typename?: 'ExpressionExample', id: string, definition: string, cantons: Array<string>, createdAt: string, authorId?: string | null, expression: { __typename?: 'Expression', id: string, title: string } } & { ' $fragmentName'?: 'ExpressionExampleFragmentFragment' };

export type ExpressionFragmentFragment = { __typename?: 'Expression', id: string, title: string, definition?: string | null, published: boolean, likesCount: number, likedByMe: boolean, dislikesCount: number, dislikedByMe: boolean, flaggedByMe: boolean, bookmarkedByMe: boolean, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, type?: ExpressionType | null, gender?: ExpressionGender | null, author?: { __typename?: 'User', id: string, name: string, image?: string | null } | null, examples: Array<(
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

export type AdminExpressionFragmentFragment = { __typename?: 'Expression', id: string, title: string, definition?: string | null, published: boolean, likesCount: number, dislikesCount: number, createdAt: string, updatedAt?: string | null, language: Language, cantons: Array<string>, type?: ExpressionType | null, gender?: ExpressionGender | null, author?: { __typename?: 'User', id: string, name: string, image?: string | null } | null, examples: Array<(
    { __typename?: 'ExpressionExample' }
    & { ' $fragmentRefs'?: { 'ExpressionExampleFragmentFragment': ExpressionExampleFragmentFragment } }
  )>, flagged: Array<{ __typename?: 'Flag', authorId: string, createdAt: string }> } & { ' $fragmentName'?: 'AdminExpressionFragmentFragment' };

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


export type CreateExpressionMutation = { __typename?: 'Mutation', createExpression:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationCreateExpressionSuccess', data: (
        { __typename?: 'Expression', id: string }
        & { ' $fragmentRefs'?: { 'AdminExpressionFragmentFragment': AdminExpressionFragmentFragment } }
      ) }
    | { __typename: 'ValidationError', message: string, issues: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> }
   };

export type UpdateExpressionMutationVariables = Exact<{
  data: UpdateExpressionInput;
}>;


export type UpdateExpressionMutation = { __typename?: 'Mutation', updateExpression:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationUpdateExpressionSuccess', data: { __typename?: 'Expression', id: string } }
    | { __typename: 'ValidationError', message: string, issues: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> }
   };

export type DeleteExpressionMutationVariables = Exact<{
  data: ExpressionIdInput;
}>;


export type DeleteExpressionMutation = { __typename?: 'Mutation', deleteExpression:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationDeleteExpressionSuccess', data: { __typename?: 'Expression', id: string } }
   };

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


export type ExpressionActionMutation = { __typename?: 'Mutation', expressionAction:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationExpressionActionSuccess', data: boolean }
   };

export type CreateExpressionExampleMutationVariables = Exact<{
  data: CreateExpressionExampleInput;
}>;


export type CreateExpressionExampleMutation = { __typename?: 'Mutation', createExpressionExample:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationCreateExpressionExampleSuccess', data: { __typename?: 'ExpressionExample', id: string, expressionId: string } }
    | { __typename: 'ValidationError', message: string, issues: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> }
   };

export type UpdateExpressionExampleMutationVariables = Exact<{
  data: UpdateExpressionExampleInput;
}>;


export type UpdateExpressionExampleMutation = { __typename?: 'Mutation', updateExpressionExample:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationUpdateExpressionExampleSuccess', data: { __typename?: 'ExpressionExample', id: string, expressionId: string } }
    | { __typename: 'ValidationError', message: string, issues: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> }
   };

export type DeleteExpressionExampleMutationVariables = Exact<{
  data: DeleteExpressionExampleInput;
}>;


export type DeleteExpressionExampleMutation = { __typename?: 'Mutation', deleteExpressionExample:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationDeleteExpressionExampleSuccess', data: { __typename?: 'ExpressionExample', id: string, expressionId: string } }
   };

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


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationUpdateUserSuccess', data: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
      ) }
    | { __typename: 'ValidationError', message: string, issues: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> }
   };

export type ChangeUserRoleMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  role: Role;
}>;


export type ChangeUserRoleMutation = { __typename?: 'Mutation', changeUserRole:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationChangeUserRoleSuccess', data: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'MeFragmentFragment': MeFragmentFragment } }
      ) }
   };

export type DeleteUserMutationVariables = Exact<{
  data: UserIdInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser:
    | { __typename: 'BaseError', message: string }
    | { __typename: 'MutationDeleteUserSuccess', data: { __typename?: 'User', id: string } }
   };

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
export const CreateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateExpressionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreateExpressionMutation, CreateExpressionMutationVariables>;
export const UpdateExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpressionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateExpressionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateExpressionMutation, UpdateExpressionMutationVariables>;
export const DeleteExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteExpressionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteExpressionMutation, DeleteExpressionMutationVariables>;
export const ExpressionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expression"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expression"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"flaggedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synonymOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ExpressionQuery, ExpressionQueryVariables>;
export const ExpressionActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExpressionAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationExpressionActionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ExpressionActionMutation, ExpressionActionMutationVariables>;
export const CreateExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateExpressionExampleSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateExpressionExampleMutation, CreateExpressionExampleMutationVariables>;
export const UpdateExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateExpressionExampleSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateExpressionExampleMutation, UpdateExpressionExampleMutationVariables>;
export const DeleteExpressionExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpressionExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteExpressionExampleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpressionExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteExpressionExampleSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expressionId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteExpressionExampleMutation, DeleteExpressionExampleMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const VerifyUserNameIsUniqueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyUserNameIsUnique"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUserNameIsUnique"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<VerifyUserNameIsUniqueQuery, VerifyUserNameIsUniqueQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationChangeUserRoleSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const AdminUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpressionExampleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExpressionExample"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminExpressionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expression"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpressionExampleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"cantons"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"expressions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminExpressionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"flags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expressionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminUserQueryQuery, AdminUserQueryQueryVariables>;
export const AdminUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUsersFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUsersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikesCount"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedExpressionsCount"},"name":{"kind":"Name","value":"myPublishedExpressionsCount"}},{"kind":"Field","alias":{"kind":"Name","value":"unpublishedExpressionsCount"},"name":{"kind":"Name","value":"myUnpublishedExpressionsCount"}}]}}]} as unknown as DocumentNode<AdminUsersQueryQuery, AdminUsersQueryQueryVariables>;