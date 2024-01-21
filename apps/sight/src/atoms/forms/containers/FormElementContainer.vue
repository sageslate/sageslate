<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <label class="relative cursor-pointer">
    <slot />
  </label>
</template>
