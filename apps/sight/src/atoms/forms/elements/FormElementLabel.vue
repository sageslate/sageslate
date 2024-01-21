<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <span class="select-none text-sm font-medium text-white">
    <slot />
  </span>
</template>
