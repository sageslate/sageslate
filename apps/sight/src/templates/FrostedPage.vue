<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router/auto'

import FrostedGlass from '@/atoms/common/containers/FrostedGlass.vue'

defineSlots<{
  default(): unknown
}>()

const { t } = useI18n()
</script>

<template>
  <section class="grow flex-col items-stretch gap-4 self-stretch p-4">
    <RouterLink class="text-shadow font-display flex justify-center text-3xl shadow-black/75 drop-shadow" to="/">
      {{ t('common.brand') }}
    </RouterLink>
    <FrostedGlass>
      <slot />
    </FrostedGlass>
  </section>
</template>
