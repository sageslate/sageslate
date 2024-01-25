/// <reference types="graphql" />
import * as VueApolloComposable from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

import type * as VueCompositionApi from 'vue'
export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type ReactiveFunction<TParameter> = () => TParameter
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: string; output: string }
}

export type AdminAuthenticationResult = {
  __typename?: 'AdminAuthenticationResult'
  token: Scalars['String']['output']
}

export type AdminMutation = {
  __typename?: 'AdminMutation'
  createRealm: Realm
  login: AdminAuthenticationResult
  setup: AdminAuthenticationResult
}

export type AdminMutationCreateRealmArguments = {
  input: RealmCreateInput
}

export type AdminMutationLoginArguments = {
  password: Scalars['String']['input']
}

export type AdminMutationSetupArguments = {
  input: AdminSetupInput
}

export type AdminQuery = {
  __typename?: 'AdminQuery'
  isAuthenticated: Scalars['Boolean']['output']
}

export type AdminSetupInput = {
  password: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  admin: AdminMutation
}

export type Query = {
  __typename?: 'Query'
  admin: AdminQuery
  isInitialized: Scalars['Boolean']['output']
  realms: Array<Realm>
}

export type Realm = {
  __typename?: 'Realm'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  isRunning: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type RealmCreateInput = {
  id: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type CreateRealmMutationVariables = Exact<{
  input: RealmCreateInput
}>

export type CreateRealmMutation = {
  __typename?: 'Mutation'
  admin: { __typename?: 'AdminMutation'; createRealm: { __typename?: 'Realm'; id: string } }
}

export type InitializeMutationVariables = Exact<{
  input: AdminSetupInput
}>

export type InitializeMutation = {
  __typename?: 'Mutation'
  admin: { __typename?: 'AdminMutation'; setup: { __typename?: 'AdminAuthenticationResult'; token: string } }
}

export type InitializedQueryVariables = Exact<{ [key: string]: never }>

export type InitializedQuery = { __typename?: 'Query'; isInitialized: boolean }

export type RealmsQueryVariables = Exact<{ [key: string]: never }>

export type RealmsQuery = { __typename?: 'Query'; realms: Array<{ __typename?: 'Realm'; id: string; name: string }> }

export type AdminAuthenticateMutationVariables = Exact<{
  password: Scalars['String']['input']
}>

export type AdminAuthenticateMutation = {
  __typename?: 'Mutation'
  admin: { __typename?: 'AdminMutation'; login: { __typename?: 'AdminAuthenticationResult'; token: string } }
}

export type IsAdminQueryVariables = Exact<{ [key: string]: never }>

export type IsAdminQuery = { __typename?: 'Query'; admin: { __typename?: 'AdminQuery'; isAuthenticated: boolean } }

export const CreateRealmDocument = gql`
  mutation CreateRealm($input: RealmCreateInput!) {
    admin {
      createRealm(input: $input) {
        id
      }
    }
  }
`

/**
 * __useCreateRealmMutation__
 *
 * To run a mutation, you first call `useCreateRealmMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateRealmMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { createRealm, isCreateRealmMutationLoading, createRealmMutationError, onCreateRealmMutationDone } = useCreateRealmMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateRealmMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateRealmMutation, CreateRealmMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateRealmMutation, CreateRealmMutationVariables>> = {},
) {
  const {
    loading: isCreateRealmMutationLoading,
    error: createRealmMutationError,
    onError: onCreateRealmMutationError,
    mutate: createRealm,
    called: hasCreateRealmMutationCalled,
    onDone: onCreateRealmMutationDone,
  } = VueApolloComposable.useMutation<CreateRealmMutation, CreateRealmMutationVariables>(CreateRealmDocument, options)
  return {
    isCreateRealmMutationLoading,
    createRealmMutationError,
    onCreateRealmMutationError,
    createRealm,
    hasCreateRealmMutationCalled,
    onCreateRealmMutationDone,
  }
}
export type CreateRealmMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateRealmMutation,
  CreateRealmMutationVariables
>
export const InitializeDocument = gql`
  mutation Initialize($input: AdminSetupInput!) {
    admin {
      setup(input: $input) {
        token
      }
    }
  }
`

/**
 * __useInitializeMutation__
 *
 * To run a mutation, you first call `useInitializeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useInitializeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { initialize, isInitializeMutationLoading, initializeMutationError, onInitializeMutationDone } = useInitializeMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useInitializeMutation(
  options:
    | VueApolloComposable.UseMutationOptions<InitializeMutation, InitializeMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<InitializeMutation, InitializeMutationVariables>> = {},
) {
  const {
    loading: isInitializeMutationLoading,
    error: initializeMutationError,
    onError: onInitializeMutationError,
    mutate: initialize,
    called: hasInitializeMutationCalled,
    onDone: onInitializeMutationDone,
  } = VueApolloComposable.useMutation<InitializeMutation, InitializeMutationVariables>(InitializeDocument, options)
  return {
    isInitializeMutationLoading,
    initializeMutationError,
    onInitializeMutationError,
    initialize,
    hasInitializeMutationCalled,
    onInitializeMutationDone,
  }
}
export type InitializeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  InitializeMutation,
  InitializeMutationVariables
>
export const InitializedDocument = gql`
  query Initialized {
    isInitialized
  }
`

/**
 * __useInitializedQuery__
 *
 * To run a query within a Vue component, call `useInitializedQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitializedQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { initializedQueryResult, isInitializedQueryLoading, initializedQueryError } = useInitializedQuery();
 */
export function useInitializedQuery(
  options:
    | VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>> = {},
) {
  const {
    loading: isInitializedQueryLoading,
    error: initializedQueryError,
    onError: onInitializedQueryError,
    result: initializedQueryResult,
    variables: initializedQueryVariables,
    refetch: refetchInitializedQuery,
    fetchMore: fetchMoreInitializedQuery,
    subscribeToMore: subscribeToMoreInitializedQuery,
    onResult: onInitializedQueryResult,
  } = VueApolloComposable.useQuery<InitializedQuery, InitializedQueryVariables>(InitializedDocument, {}, options)
  return {
    isInitializedQueryLoading,
    initializedQueryError,
    onInitializedQueryError,
    initializedQueryResult,
    initializedQueryVariables,
    refetchInitializedQuery,
    fetchMoreInitializedQuery,
    subscribeToMoreInitializedQuery,
    onInitializedQueryResult,
  }
}
export function useInitializedLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<InitializedQuery, InitializedQueryVariables>> = {},
) {
  const {
    loading: isInitializedLazyQueryLoading,
    error: initializedLazyQueryError,
    onError: onInitializedLazyQueryError,
    result: initializedLazyQueryResult,
    variables: initializedLazyQueryVariables,
    refetch: refetchInitializedLazyQuery,
    fetchMore: fetchMoreInitializedLazyQuery,
    subscribeToMore: subscribeToMoreInitializedLazyQuery,
    onResult: onInitializedLazyQueryResult,
  } = VueApolloComposable.useLazyQuery<InitializedQuery, InitializedQueryVariables>(InitializedDocument, {}, options)
  return {
    isInitializedLazyQueryLoading,
    initializedLazyQueryError,
    onInitializedLazyQueryError,
    initializedLazyQueryResult,
    initializedLazyQueryVariables,
    refetchInitializedLazyQuery,
    fetchMoreInitializedLazyQuery,
    subscribeToMoreInitializedLazyQuery,
    onInitializedLazyQueryResult,
  }
}
export type InitializedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  InitializedQuery,
  InitializedQueryVariables
>
export const RealmsDocument = gql`
  query Realms {
    realms {
      id
      name
    }
  }
`

/**
 * __useRealmsQuery__
 *
 * To run a query within a Vue component, call `useRealmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRealmsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { realmsQueryResult, isRealmsQueryLoading, realmsQueryError } = useRealmsQuery();
 */
export function useRealmsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>> = {},
) {
  const {
    loading: isRealmsQueryLoading,
    error: realmsQueryError,
    onError: onRealmsQueryError,
    result: realmsQueryResult,
    variables: realmsQueryVariables,
    refetch: refetchRealmsQuery,
    fetchMore: fetchMoreRealmsQuery,
    subscribeToMore: subscribeToMoreRealmsQuery,
    onResult: onRealmsQueryResult,
  } = VueApolloComposable.useQuery<RealmsQuery, RealmsQueryVariables>(RealmsDocument, {}, options)
  return {
    isRealmsQueryLoading,
    realmsQueryError,
    onRealmsQueryError,
    realmsQueryResult,
    realmsQueryVariables,
    refetchRealmsQuery,
    fetchMoreRealmsQuery,
    subscribeToMoreRealmsQuery,
    onRealmsQueryResult,
  }
}
export function useRealmsLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<RealmsQuery, RealmsQueryVariables>> = {},
) {
  const {
    loading: isRealmsLazyQueryLoading,
    error: realmsLazyQueryError,
    onError: onRealmsLazyQueryError,
    result: realmsLazyQueryResult,
    variables: realmsLazyQueryVariables,
    refetch: refetchRealmsLazyQuery,
    fetchMore: fetchMoreRealmsLazyQuery,
    subscribeToMore: subscribeToMoreRealmsLazyQuery,
    onResult: onRealmsLazyQueryResult,
  } = VueApolloComposable.useLazyQuery<RealmsQuery, RealmsQueryVariables>(RealmsDocument, {}, options)
  return {
    isRealmsLazyQueryLoading,
    realmsLazyQueryError,
    onRealmsLazyQueryError,
    realmsLazyQueryResult,
    realmsLazyQueryVariables,
    refetchRealmsLazyQuery,
    fetchMoreRealmsLazyQuery,
    subscribeToMoreRealmsLazyQuery,
    onRealmsLazyQueryResult,
  }
}
export type RealmsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RealmsQuery, RealmsQueryVariables>
export const AdminAuthenticateDocument = gql`
  mutation AdminAuthenticate($password: String!) {
    admin {
      login(password: $password) {
        token
      }
    }
  }
`

/**
 * __useAdminAuthenticateMutation__
 *
 * To run a mutation, you first call `useAdminAuthenticateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAdminAuthenticateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { adminAuthenticate, isAdminAuthenticateMutationLoading, adminAuthenticateMutationError, onAdminAuthenticateMutationDone } = useAdminAuthenticateMutation({
 *   variables: {
 *     password: // value for 'password'
 *   },
 * });
 */
export function useAdminAuthenticateMutation(
  options:
    | VueApolloComposable.UseMutationOptions<AdminAuthenticateMutation, AdminAuthenticateMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<AdminAuthenticateMutation, AdminAuthenticateMutationVariables>
      > = {},
) {
  const {
    loading: isAdminAuthenticateMutationLoading,
    error: adminAuthenticateMutationError,
    onError: onAdminAuthenticateMutationError,
    mutate: adminAuthenticate,
    called: hasAdminAuthenticateMutationCalled,
    onDone: onAdminAuthenticateMutationDone,
  } = VueApolloComposable.useMutation<AdminAuthenticateMutation, AdminAuthenticateMutationVariables>(
    AdminAuthenticateDocument,
    options,
  )
  return {
    isAdminAuthenticateMutationLoading,
    adminAuthenticateMutationError,
    onAdminAuthenticateMutationError,
    adminAuthenticate,
    hasAdminAuthenticateMutationCalled,
    onAdminAuthenticateMutationDone,
  }
}
export type AdminAuthenticateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AdminAuthenticateMutation,
  AdminAuthenticateMutationVariables
>
export const IsAdminDocument = gql`
  query IsAdmin {
    admin {
      isAuthenticated
    }
  }
`

/**
 * __useIsAdminQuery__
 *
 * To run a query within a Vue component, call `useIsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAdminQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { isAdminQueryResult, isIsAdminQueryLoading, isAdminQueryError } = useIsAdminQuery();
 */
export function useIsAdminQuery(
  options:
    | VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>> = {},
) {
  const {
    loading: isIsAdminQueryLoading,
    error: isAdminQueryError,
    onError: onIsAdminQueryError,
    result: isAdminQueryResult,
    variables: isAdminQueryVariables,
    refetch: refetchIsAdminQuery,
    fetchMore: fetchMoreIsAdminQuery,
    subscribeToMore: subscribeToMoreIsAdminQuery,
    onResult: onIsAdminQueryResult,
  } = VueApolloComposable.useQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, {}, options)
  return {
    isIsAdminQueryLoading,
    isAdminQueryError,
    onIsAdminQueryError,
    isAdminQueryResult,
    isAdminQueryVariables,
    refetchIsAdminQuery,
    fetchMoreIsAdminQuery,
    subscribeToMoreIsAdminQuery,
    onIsAdminQueryResult,
  }
}
export function useIsAdminLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<IsAdminQuery, IsAdminQueryVariables>> = {},
) {
  const {
    loading: isIsAdminLazyQueryLoading,
    error: isAdminLazyQueryError,
    onError: onIsAdminLazyQueryError,
    result: isAdminLazyQueryResult,
    variables: isAdminLazyQueryVariables,
    refetch: refetchIsAdminLazyQuery,
    fetchMore: fetchMoreIsAdminLazyQuery,
    subscribeToMore: subscribeToMoreIsAdminLazyQuery,
    onResult: onIsAdminLazyQueryResult,
  } = VueApolloComposable.useLazyQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, {}, options)
  return {
    isIsAdminLazyQueryLoading,
    isAdminLazyQueryError,
    onIsAdminLazyQueryError,
    isAdminLazyQueryResult,
    isAdminLazyQueryVariables,
    refetchIsAdminLazyQuery,
    fetchMoreIsAdminLazyQuery,
    subscribeToMoreIsAdminLazyQuery,
    onIsAdminLazyQueryResult,
  }
}
export type IsAdminQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  IsAdminQuery,
  IsAdminQueryVariables
>
