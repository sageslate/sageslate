import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AdminMutationMapper, AdminQueryMapper } from "./../graphql/Admin.mappers.js";
import { RealmMapper } from "./../graphql/Realm.mappers.js";
import { ApolloContext } from '../types/apollo.js';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends {[key: string]: unknown;}> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends {[key: string]: unknown;}, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string;output: string | number;};
  String: {input: string;output: string;};
  Boolean: {input: boolean;output: boolean;};
  Int: {input: number;output: number;};
  Float: {input: number;output: number;};
  DateTime: {input: Date | string;output: Date | string;};
};

export type AdminAuthenticationResult = {
  __typename?: 'AdminAuthenticationResult';
  token: Scalars['String']['output'];
};

export type AdminMutation = {
  __typename?: 'AdminMutation';
  createRealm: Realm;
  login: AdminAuthenticationResult;
  setup: AdminAuthenticationResult;
};


export type AdminMutationcreateRealmArgs = {
  input: RealmCreateInput;
};


export type AdminMutationloginArgs = {
  password: Scalars['String']['input'];
};


export type AdminMutationsetupArgs = {
  input: AdminSetupInput;
};

export type AdminQuery = {
  __typename?: 'AdminQuery';
  isAuthenticated: Scalars['Boolean']['output'];
};

export type AdminSetupInput = {
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  admin: AdminMutation;
};

export type Query = {
  __typename?: 'Query';
  admin: AdminQuery;
  isInitialized: Scalars['Boolean']['output'];
  realms: Array<Realm>;
};

export type Realm = {
  __typename?: 'Realm';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRunning: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RealmCreateInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
parent: TParent,
args: TArgs,
context: TContext,
info: GraphQLResolveInfo) =>
Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
parent: TParent,
args: TArgs,
context: TContext,
info: GraphQLResolveInfo) =>
AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
parent: TParent,
args: TArgs,
context: TContext,
info: GraphQLResolveInfo) =>
TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> |
SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) |
SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
parent: TParent,
context: TContext,
info: GraphQLResolveInfo) =>
Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
next: NextResolverFn<TResult>,
parent: TParent,
args: TArgs,
context: TContext,
info: GraphQLResolveInfo) =>
TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminAuthenticationResult: ResolverTypeWrapper<AdminAuthenticationResult>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AdminMutation: ResolverTypeWrapper<AdminMutationMapper>;
  AdminQuery: ResolverTypeWrapper<AdminQueryMapper>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  AdminSetupInput: AdminSetupInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Realm: ResolverTypeWrapper<RealmMapper>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  RealmCreateInput: RealmCreateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminAuthenticationResult: AdminAuthenticationResult;
  String: Scalars['String']['output'];
  AdminMutation: AdminMutationMapper;
  AdminQuery: AdminQueryMapper;
  Boolean: Scalars['Boolean']['output'];
  AdminSetupInput: AdminSetupInput;
  DateTime: Scalars['DateTime']['output'];
  Mutation: {};
  Query: {};
  Realm: RealmMapper;
  ID: Scalars['ID']['output'];
  RealmCreateInput: RealmCreateInput;
};

export type AdminAuthenticationResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AdminAuthenticationResult'] = ResolversParentTypes['AdminAuthenticationResult']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminMutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AdminMutation'] = ResolversParentTypes['AdminMutation']> = {
  createRealm?: Resolver<ResolversTypes['Realm'], ParentType, ContextType, RequireFields<AdminMutationcreateRealmArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AdminAuthenticationResult'], ParentType, ContextType, RequireFields<AdminMutationloginArgs, 'password'>>;
  setup?: Resolver<ResolversTypes['AdminAuthenticationResult'], ParentType, ContextType, RequireFields<AdminMutationsetupArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminQueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AdminQuery'] = ResolversParentTypes['AdminQuery']> = {
  isAuthenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  admin?: Resolver<ResolversTypes['AdminMutation'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  admin?: Resolver<ResolversTypes['AdminQuery'], ParentType, ContextType>;
  isInitialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  realms?: Resolver<Array<ResolversTypes['Realm']>, ParentType, ContextType>;
};

export type RealmResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Realm'] = ResolversParentTypes['Realm']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRunning?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  AdminAuthenticationResult?: AdminAuthenticationResultResolvers<ContextType>;
  AdminMutation?: AdminMutationResolvers<ContextType>;
  AdminQuery?: AdminQueryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Realm?: RealmResolvers<ContextType>;
};