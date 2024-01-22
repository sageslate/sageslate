<script setup lang="ts">
import { useRouter } from 'vue-router'
import { definePage } from 'vue-router/auto'

import { useAuthenticationStore } from '@/stores/authentication'

definePage({
  meta: {
    isInitializedOnly: true,
    isInitialStatePage: true,
    isAdminOnly: true,
  },
})

const authenticationStore = useAuthenticationStore()

const router = useRouter()

async function logOut() {
  authenticationStore.setToken('')
  await router.push('/authentication')
}
</script>

<template>
  <button @click="logOut">Exit</button>
</template>
