<script setup lang="ts">
import { definePage } from 'vue-router/auto'

import InitialSetup from '@/organisms/specific/admin/InitialSetup.vue'
import CenteredFrostedContainer from '@/templates/CenteredFrostedContainer.vue'

definePage({
  meta: {
    isPreInitializedOnly: true,
    isInitialStatePage: true,
  },
})
</script>

<template>
  <CenteredFrostedContainer>
    <InitialSetup />
  </CenteredFrostedContainer>
</template>
