/// <reference types="graphql" />
import * as VueApolloComposable from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import * as VueCompositionApi from 'vue'

import { strictInject, RealmIdInjectionKey } from '@/atoms/utils/strictInject'
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

export type Query = {
  __typename?: 'Query'
  users: Array<User>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  updatedAt: Scalars['DateTime']['output']
  username: Scalars['String']['output']
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: 'Query'; users: Array<{ __typename?: 'User'; id: string; username: string }> }

export const UsersDocument = gql`
  query Users {
    users {
      id
      username
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a Vue component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { usersQueryResult, isUsersQueryLoading, usersQueryError } = useUsersQuery();
 */
export function useUsersQuery(
  options:
    | VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {},
) {
  const realmId = strictInject(RealmIdInjectionKey)
  const {
    loading: isUsersQueryLoading,
    error: usersQueryError,
    onError: onUsersQueryError,
    result: usersQueryResult,
    variables: usersQueryVariables,
    refetch: refetchUsersQuery,
    fetchMore: fetchMoreUsersQuery,
    subscribeToMore: subscribeToMoreUsersQuery,
    onResult: onUsersQueryResult,
  } = VueApolloComposable.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, () => ({
    ...VueCompositionApi.toValue(options),
    clientId: realmId.value,
  }))
  return {
    isUsersQueryLoading,
    usersQueryError,
    onUsersQueryError,
    usersQueryResult,
    usersQueryVariables,
    refetchUsersQuery,
    fetchMoreUsersQuery,
    subscribeToMoreUsersQuery,
    onUsersQueryResult,
  }
}
export function useUsersLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {},
) {
  const realmId = strictInject(RealmIdInjectionKey)
  const {
    loading: isUsersLazyQueryLoading,
    error: usersLazyQueryError,
    onError: onUsersLazyQueryError,
    result: usersLazyQueryResult,
    variables: usersLazyQueryVariables,
    refetch: refetchUsersLazyQuery,
    fetchMore: fetchMoreUsersLazyQuery,
    subscribeToMore: subscribeToMoreUsersLazyQuery,
    onResult: onUsersLazyQueryResult,
  } = VueApolloComposable.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, () => ({
    ...VueCompositionApi.toValue(options),
    clientId: realmId.value,
  }))
  return {
    isUsersLazyQueryLoading,
    usersLazyQueryError,
    onUsersLazyQueryError,
    usersLazyQueryResult,
    usersLazyQueryVariables,
    refetchUsersLazyQuery,
    fetchMoreUsersLazyQuery,
    subscribeToMoreUsersLazyQuery,
    onUsersLazyQueryResult,
  }
}
export type UsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersQuery, UsersQueryVariables>
