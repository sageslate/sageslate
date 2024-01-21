<script setup lang="ts">
import FormElementContainer from '@/atoms/forms/containers/FormElementContainer.vue'
import FormElementLabel from '@/atoms/forms/elements/FormElementLabel.vue'
import TextInputAtom from '@/atoms/forms/elements/TextInputAtom.vue'

const props = withDefaults(
  defineProps<{
    type?: 'text' | 'password'
    name?: string
    placeholder?: string
    label?: string
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
    label: undefined,
  },
)

const slots = defineSlots<{
  default?(): unknown
}>()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <FormElementContainer class="flex-col md:gap-2">
    <FormElementLabel v-if="slots.default || props.label">
      <slot>{{ props.label }}</slot>
    </FormElementLabel>
    <TextInputAtom v-model="modelValue" :name="props.name" :placeholder="props.placeholder" :type="props.type" />
  </FormElementContainer>
</template>
