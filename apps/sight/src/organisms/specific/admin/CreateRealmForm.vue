<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import { ObjectId } from 'bson'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import SageForm from '@/atoms/forms/containers/SageForm.vue'
import { useCreateRealmMutation } from '@/graphql/core'
import SageInput from '@/molecules/forms/SageInput.vue'

const { t } = useI18n()

const name = ref('')

const { createRealm, isCreateRealmMutationLoading } = useCreateRealmMutation()

async function handleFormSubmit() {
  await createRealm({
    input: {
      name: name.value,
      id: new ObjectId().toHexString(),
    },
  })
}
</script>

<template>
  <SageForm @submit="handleFormSubmit">
    <SageInput v-model="name" :label="t('forms.realm-name')" :placeholder="t('forms.realm-name-placeholder')" />

    <SageButton :isDisabled="isCreateRealmMutationLoading" class="flex-row" theme="primary" type="submit">
      {{ t('forms.create-realm-submit') }}
      <Transition name="fade">
        <SageIcon v-if="isCreateRealmMutationLoading" :icon="mdiLoading" class="animate-spin" size="20" />
      </Transition>
    </SageButton>
  </SageForm>
</template>
