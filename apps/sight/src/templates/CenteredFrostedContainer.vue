<script setup lang="ts">
import FrostedGlass from '@/atoms/common/containers/FrostedGlass.vue'

defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <section class="self-stretch p-4 md:w-1/2 md:self-center">
    <FrostedGlass>
      <slot />
    </FrostedGlass>
  </section>
</template>
