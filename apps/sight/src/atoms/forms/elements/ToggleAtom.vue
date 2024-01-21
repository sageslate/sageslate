<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()

const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <input v-model="modelValue" class="peer sr-only" type="checkbox" />
  <div
    class="peer h-6 w-11 rounded-full border border-gray-600 bg-gray-700 peer-checked:bg-blue-600 peer-checked:*:translate-x-full peer-checked:*:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800"
  >
    <div class="absolute start-[2px] top-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-all">
      <div class="relative h-full w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
