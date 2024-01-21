<script setup lang="ts">
import { mdiInformation, mdiCloseCircle, mdiCheckCircle, mdiAlertCircle } from '@mdi/js'
import { computed } from 'vue'

import FrostedGlass from '@/atoms/common/containers/FrostedGlass.vue'
import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import { AlertType } from '@/stores/alerts'

import type { Alert } from '@/stores/alerts'

const props = defineProps<{
  alert: Alert
}>()
const emit = defineEmits<{
  close: []
}>()

const icon = computed(() => {
  switch (props.alert.type) {
    case AlertType.Success: {
      return mdiCheckCircle
    }
    case AlertType.Warning:
    case AlertType.Error: {
      return mdiAlertCircle
    }
    default: {
      return mdiInformation
    }
  }
})

const messages = computed(() => {
  if (typeof props.alert.message === 'string') {
    return [props.alert.message]
  }

  return props.alert.message
})
</script>

<template>
  <FrostedGlass
    :class="{
      'border-blue-500 text-blue-300': props.alert.type === AlertType.Information,
      'border-green-500 text-green-300': props.alert.type === AlertType.Success,
      'border-yellow-500 text-yellow-300': props.alert.type === AlertType.Warning,
      'border-red-500 text-red-300': props.alert.type === AlertType.Error,
    }"
    class="items-stretch gap-2 border p-4 shadow-md"
    flexDirection="row"
  >
    <div class="w-8 shrink-0 items-center justify-center">
      <SageIcon :icon="icon" />
    </div>
    <div class="grow items-center text-sm font-medium">
      <p v-for="(message, index) in messages" :key="index">{{ message }}</p>
    </div>

    <div class="w-8 shrink-0 items-center justify-center">
      <SageButton padding="tiny" theme="text" @click.prevent="() => emit('close')">
        <SageIcon :icon="mdiCloseCircle" />
      </SageButton>
    </div>
  </FrostedGlass>
</template>
