import { DefaultApolloClient } from '@vue/apollo-composable'
import { noop } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router/auto'

import { strictInject } from '@/atoms/utils/strictInject'
import { useInitializeMutation, IsInitializedDocument } from '@/graphql'

import { AlertType, useAlertsStore } from './alerts'

import type { IsInitializedQuery } from '@/graphql'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export enum InitializedState {
  Error,
  Initialized,
  Uninitialized,
}

export const useInitializationStore = defineStore('initialization', () => {
  const router = useRouter()
  const alertsStore = useAlertsStore()

  const { t } = useI18n()

  const { mutate, loading: isInitializing } = useInitializeMutation()

  const apolloClient = strictInject<ApolloClient<NormalizedCacheObject>>(DefaultApolloClient)

  const initializedState = ref<InitializedState>()
  const promiseToWait = runIsInitializedQuery()

  async function runIsInitializedQuery() {
    try {
      const resource = await apolloClient.query<IsInitializedQuery>({
        query: IsInitializedDocument,
        fetchPolicy: 'no-cache',
      })

      initializedState.value = resource.data.isInitialized
        ? InitializedState.Initialized
        : InitializedState.Uninitialized
    } catch {
      initializedState.value = InitializedState.Error
    }
  }
  async function getInitializedState() {
    await promiseToWait
    return initializedState.value!
  }

  async function initialize(password: string) {
    try {
      await mutate({ input: { password } })
      initializedState.value = InitializedState.Initialized
      alertsStore.message({
        message: t('alerts.app-initialization-success'),
        type: AlertType.Success,
      })
      void router.push('/')
    } catch {
      noop()
    }
  }

  return {
    initializedState,
    isInitializing,
    getInitializedState,
    initialize,
  }
})
