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
  realms: Array<Realm>
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
}

export type Realm = {
  __typename?: 'Realm'
  createdAt: Scalars['DateTime']['output']
  folderName: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type RealmCreateInput = {
  folderName: Scalars['String']['input']
  id: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type InitializeMutationVariables = Exact<{
  input: AdminSetupInput
}>

export type InitializeMutation = {
  __typename?: 'Mutation'
  admin: { __typename?: 'AdminMutation'; setup: { __typename?: 'AdminAuthenticationResult'; token: string } }
}

export type IsInitializedQueryVariables = Exact<{ [key: string]: never }>

export type IsInitializedQuery = { __typename?: 'Query'; isInitialized: boolean }

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
 * const { mutate, loading, error, onDone } = useInitializeMutation({
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
  return VueApolloComposable.useMutation<InitializeMutation, InitializeMutationVariables>(InitializeDocument, options)
}
export type InitializeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  InitializeMutation,
  InitializeMutationVariables
>
export const IsInitializedDocument = gql`
  query IsInitialized {
    isInitialized
  }
`

/**
 * __useIsInitializedQuery__
 *
 * To run a query within a Vue component, call `useIsInitializedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsInitializedQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useIsInitializedQuery();
 */
export function useIsInitializedQuery(
  options:
    | VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<IsInitializedQuery, IsInitializedQueryVariables>(
    IsInitializedDocument,
    {},
    options,
  )
}
export function useIsInitializedLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<IsInitializedQuery, IsInitializedQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<IsInitializedQuery, IsInitializedQueryVariables>(
    IsInitializedDocument,
    {},
    options,
  )
}
export type IsInitializedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  IsInitializedQuery,
  IsInitializedQueryVariables
>
