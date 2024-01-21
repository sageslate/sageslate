<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'text' | 'password'
    name?: string
    placeholder?: string
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
  },
)

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <input
    v-model="modelValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :type="props.type"
    class="focus:ring-primary-500 focus:border-primary-500 rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 outline-none"
  />
</template>
