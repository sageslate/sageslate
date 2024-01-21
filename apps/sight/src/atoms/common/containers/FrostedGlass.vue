<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    flexDirection?: 'row' | 'col'
  }>(),
  {
    flexDirection: 'col',
  },
)

defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <section
    :class="{
      'flex-row': props.flexDirection === 'row',
      'flex-col': props.flexDirection === 'col',
    }"
    class="from-primary-950/80 to-primary-975/80 grow rounded-lg bg-gradient-to-br backdrop-blur-xl"
  >
    <slot />
  </section>
</template>
