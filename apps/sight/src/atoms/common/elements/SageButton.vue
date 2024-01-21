<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router/auto'

import type { RouteRecordRaw } from 'vue-router/auto'

const props = withDefaults(
  defineProps<{
    theme: 'primary' | 'secondary' | 'default' | 'text'
    to?: RouteRecordRaw
    href?: string
    type?: 'button' | 'submit' | 'reset'
    isDisabled?: boolean
    padding?: 'tiny' | 'default'
  }>(),
  {
    theme: 'default',
    to: undefined,
    href: undefined,
    type: 'button',
    isDisabled: false,
    padding: 'default',
  },
)
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineSlots<{
  default(): unknown
}>()

const element = computed(() => {
  if (props.to) {
    return RouterLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})
</script>

<template>
  <Component
    :is="element"
    :class="{
      'from-primary-500 to-primary-700 focus:ring-primary-800': props.theme === 'primary',
      'from-secondary-500 to-secondary-700 focus:ring-secondary-800': props.theme === 'secondary',
      'from-gray-500 to-gray-700 focus:ring-gray-800': props.theme === 'default',
      'bg-gradient-to-r hover:bg-gradient-to-br':
        props.theme === 'primary' || props.theme === 'secondary' || props.theme === 'default',
      'bg-none hover:bg-gray-700/15 focus:ring-gray-800/5': props.theme === 'text',
      'px-5 py-2.5': props.padding === 'default',
      'p-1': props.padding === 'tiny',
    }"
    :disabled="props.isDisabled"
    :href="props.href"
    :to="props.to"
    :type="props.type"
    class="rounded-lg text-center text-sm font-medium focus:outline-none focus:ring-4"
    @click="(event: MouseEvent) => emit('click', event)"
  >
    <slot />
  </Component>
</template>
