import { doesNotExist } from '@sageslate/stone'
import { until, useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAdminAuthenticateMutation, useIsAdminQuery } from '@/graphql'

import { AlertType, useAlertsStore } from './alerts'

export const useAuthenticationStore = defineStore('authentication', () => {
  const alertsStore = useAlertsStore()

  const token = useLocalStorage<string>('sageSlateToken', '')
  const { t } = useI18n()
  const router = useRouter()

  const { isAdminQueryResult, isIsAdminQueryLoading, refetchIsAdminQuery } = useIsAdminQuery()
  const { adminAuthenticate, isAdminAuthenticateMutationLoading, onAdminAuthenticateMutationDone } =
    useAdminAuthenticateMutation()

  onAdminAuthenticateMutationDone(result => {
    if (doesNotExist(result.data?.admin.login.token)) {
      return
    }

    token.value = result.data.admin.login.token

    alertsStore.message({
      message: t('alerts.admin-authentication-success'),
      type: AlertType.Success,
    })
    void router.push('/')
  })

  watch(token, () => {
    void refetchIsAdminQuery()
  })

  const isAdmin = computed(() => isAdminQueryResult.value?.admin.isAuthenticated ?? false)

  async function waitForStoreReady() {
    await until(isIsAdminQueryLoading).toBe(false)
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  return {
    waitForStoreReady,
    isAdmin,
    token,
    setToken,
    adminAuthenticate: (password: string) => adminAuthenticate({ password }),
    isAdminAuthenticateMutationLoading,
  }
})
