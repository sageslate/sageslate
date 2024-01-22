<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import { ObjectId } from 'bson'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import SageForm from '@/atoms/forms/containers/SageForm.vue'
import { useCreateRealmMutation } from '@/graphql'
import SageInput from '@/molecules/forms/SageInput.vue'

import type { RealmCreateInput } from '@/graphql'

const { t } = useI18n()

const formData = reactive<Omit<RealmCreateInput, 'id'>>({
  folderName: '',
  name: '',
})

const { createRealm, isCreateRealmMutationLoading } = useCreateRealmMutation()

async function handleFormSubmit() {
  await createRealm({
    input: {
      ...formData,
      id: new ObjectId().toHexString(),
    },
  })
}
</script>

<template>
  <SageForm @submit="handleFormSubmit">
    <SageInput
      v-model="formData.name"
      :label="t('forms.realm-name')"
      :placeholder="t('forms.realm-name-placeholder')"
    />
    <SageInput
      v-model="formData.folderName"
      :label="t('forms.folder-name')"
      :placeholder="t('forms.folder-name-placeholder')"
    />

    <SageButton :isDisabled="isCreateRealmMutationLoading" class="flex-row" theme="primary" type="submit">
      {{ t('forms.create-realm-submit') }}
      <Transition name="fade">
        <SageIcon v-if="isCreateRealmMutationLoading" :icon="mdiLoading" class="animate-spin" size="20" />
      </Transition>
    </SageButton>
  </SageForm>
</template>
