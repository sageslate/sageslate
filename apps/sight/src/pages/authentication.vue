<script setup lang="ts">
import { definePage } from 'vue-router/auto'

import AuthenticationForm from '@/organisms/specific/admin/AuthenticationForm.vue'
import CenteredFrostedContainer from '@/templates/CenteredFrostedContainer.vue'

definePage({
  meta: {
    isInitializedOnly: true,
    isInitialStatePage: true,
    isGuestOnly: true,
  },
})
</script>

<template>
  <CenteredFrostedContainer>
    <AuthenticationForm />
  </CenteredFrostedContainer>
</template>
