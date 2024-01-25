import { doesNotExist } from '@sageslate/stone'
import { ApolloClients } from '@vue/apollo-composable'
import { until } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router/auto'

import { strictInject } from '@/atoms/utils/strictInject'
import { InitializedDocument, useInitializeMutation, useInitializedQuery } from '@/graphql/core'

import { AlertType, useAlertsStore } from './alerts'
import { useAuthenticationStore } from './authentication'

import type { InitializedQuery } from '@/graphql/core'
import type { NormalizedCacheObject, ApolloClient } from '@apollo/client'

export enum InitializedState {
  Loading,
  Error,
  Initialized,
  Uninitialized,
}

export const useInitializationStore = defineStore('initialization', () => {
  const apolloClients = strictInject<{ default: ApolloClient<NormalizedCacheObject> }>(ApolloClients)

  const alertsStore = useAlertsStore()
  const authenticationStore = useAuthenticationStore()

  const router = useRouter()
  const { t } = useI18n()

  const { initializedQueryResult, initializedQueryError, isInitializedQueryLoading } = useInitializedQuery()
  const { initialize, isInitializeMutationLoading, onInitializeMutationDone } = useInitializeMutation()

  onInitializeMutationDone(response => {
    if (doesNotExist(response.data?.admin.setup.token)) {
      return
    }

    authenticationStore.setToken(response.data.admin.setup.token)

    apolloClients.default.writeQuery<InitializedQuery>({
      query: InitializedDocument,
      data: {
        isInitialized: true,
      },
    })

    alertsStore.message({
      message: t('alerts.app-initialization-success'),
      type: AlertType.Success,
    })
    void router.push('/')
  })

  async function waitForStoreReady() {
    await until(isInitializedQueryLoading).toBe(false)
  }

  const initializedState = computed(() =>
    isInitializedQueryLoading.value
      ? InitializedState.Loading
      : initializedQueryError.value
        ? InitializedState.Error
        : initializedQueryResult.value?.isInitialized
          ? InitializedState.Initialized
          : InitializedState.Uninitialized,
  )

  return {
    waitForStoreReady,
    initializedState,
    initialize: (password: string) => initialize({ input: { password } }),
    isInitializeMutationLoading,
  }
})
