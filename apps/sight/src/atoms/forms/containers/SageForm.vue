<script setup lang="ts">
const emit = defineEmits<{
  submit: [event: Event]
}>()
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <form class="flex-col gap-4 md:gap-8" @submit.prevent="event => emit('submit', event)">
    <slot />
  </form>
</template>
