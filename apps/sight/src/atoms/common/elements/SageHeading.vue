<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <header class="items-center justify-center">
    <h2 class="font-logo text-4xl">
      <slot />
    </h2>
  </header>
</template>
