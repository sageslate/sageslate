<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    size?: number | string
    viewBoxSize?: number | string
  }>(),
  {
    size: 24,
    viewBoxSize: 24,
  },
)

const viewBox = computed(() => {
  const size = props.viewBoxSize
  return `0 0 ${size} ${size}`
})
</script>

<template>
  <svg
    :height="props.size"
    :viewBox="viewBox"
    :width="props.size"
    class="outline-none"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="props.icon" />
  </svg>
</template>
