<script setup lang="ts">
import { RouterView } from 'vue-router'

import GlobalAlerts from '@/organisms/specific/GlobalAlerts.vue'
import { useInitializationStore } from '@/stores/initialization'

// Need to call store during setup for the first time so composables can be used
useInitializationStore()
</script>

<template>
  <main class="bg-main grow flex-col items-center justify-center bg-cover bg-center">
    <RouterView />
    <GlobalAlerts />
  </main>
</template>
