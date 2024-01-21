<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <section class="grow flex-col gap-4 p-4 md:gap-8 md:p-8">
    <slot />
  </section>
</template>
