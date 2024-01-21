<script setup lang="ts">
import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import FormElementContainer from '@/atoms/forms/containers/FormElementContainer.vue'
import FormElementLabel from '@/atoms/forms/elements/FormElementLabel.vue'
import ToggleAtom from '@/atoms/forms/elements/ToggleAtom.vue'

const props = defineProps<{
  iconPathTrue?: string
  iconPathFalse?: string
  iconPath?: string
  label?: string
}>()

const slots = defineSlots<{
  default?(options: { value: boolean }): unknown
  label?(): unknown
}>()

const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <FormElementContainer class="relative items-center gap-2">
    <ToggleAtom v-model="modelValue">
      <slot :value="modelValue">
        <SageIcon v-if="props.iconPath" :icon="props.iconPath" class="absolute left-0 top-0 text-gray-900" size="18" />
        <SageIcon
          v-if="props.iconPathTrue"
          :class="{
            'opacity-0': !modelValue,
            'opacity-100': modelValue,
          }"
          :icon="props.iconPathTrue"
          class="absolute left-0 top-0 text-gray-900 transition-opacity"
          size="18"
        />
        <SageIcon
          v-if="props.iconPathFalse"
          :class="{
            'opacity-0': modelValue,
            'opacity-100': !modelValue,
          }"
          :icon="props.iconPathFalse"
          class="absolute left-0 top-0 text-gray-900 transition-opacity"
          size="18"
        />
      </slot>
    </ToggleAtom>
    <FormElementLabel v-if="slots.label || props.label">
      <slot name="label">{{ props.label }}</slot>
    </FormElementLabel>
  </FormElementContainer>
</template>
