<script setup lang="ts">
import { RouterView } from 'vue-router'

import GlobalAlerts from '@/organisms/specific/GlobalAlerts.vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useInitializationStore } from '@/stores/initialization'

// Need to call store during setup for the first time so composition works in there
useInitializationStore()
useAuthenticationStore()
</script>

<template>
  <main class="bg-main grow flex-col items-center justify-center bg-cover bg-center">
    <RouterView />
    <GlobalAlerts />
  </main>
</template>
