<script setup lang="ts">
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    isErrorPage: true,
    isInitialStatePage: true,
  },
})
</script>

<template>Error page</template>
