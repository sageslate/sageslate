<script setup lang="ts">
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SageSection from '@/atoms/common/containers/SageSection.vue'
import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageHeading from '@/atoms/common/elements/SageHeading.vue'
import SageForm from '@/atoms/forms/containers/SageForm.vue'
import SageInput from '@/molecules/forms/SageInput.vue'
import SageToggle from '@/molecules/forms/SageToggle.vue'
import { useInitializationStore } from '@/stores/initialization'

const { t } = useI18n()
const initializationStore = useInitializationStore()

const adminPassword = ref('')
const isPasswordVisible = ref(false)

function showAlert() {
  void initializationStore.initialize(adminPassword.value)
}
</script>

<template>
  <SageSection>
    <SageHeading>{{ t('setup.title') }}</SageHeading>
    <SageForm @submit="showAlert">
      <SageInput
        v-model="adminPassword"
        :label="t('setup.admin-password')"
        :placeholder="t('setup.admin-password-placeholder')"
        :type="isPasswordVisible ? 'text' : 'password'"
      />
      <SageToggle
        v-model="isPasswordVisible"
        :iconPathFalse="mdiEyeOff"
        :iconPathTrue="mdiEye"
        :label="t('setup.display-password')"
      />
      <SageButton theme="primary" type="submit">{{ t('common.submit') }}</SageButton>
    </SageForm>
  </SageSection>
</template>
