<script setup lang="ts">
import { mdiEye, mdiEyeOff, mdiLoading } from '@mdi/js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SageSection from '@/atoms/common/containers/SageSection.vue'
import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageHeading from '@/atoms/common/elements/SageHeading.vue'
import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import SageForm from '@/atoms/forms/containers/SageForm.vue'
import SageInput from '@/molecules/forms/SageInput.vue'
import SageToggle from '@/molecules/forms/SageToggle.vue'
import { useInitializationStore } from '@/stores/initialization'

const initializationStore = useInitializationStore()

const { t } = useI18n()

const adminPassword = ref('')
const isPasswordVisible = ref(false)

function showAlert() {
  void initializationStore.initialize(adminPassword.value)
}
</script>

<template>
  <SageSection>
    <SageHeading>{{ t('admin.setup-title') }}</SageHeading>
    <SageForm @submit="showAlert">
      <SageInput
        v-model="adminPassword"
        :label="t('forms.admin-password')"
        :placeholder="t('forms.admin-password-placeholder')"
        :type="isPasswordVisible ? 'text' : 'password'"
      />
      <SageToggle
        v-model="isPasswordVisible"
        :iconPathFalse="mdiEyeOff"
        :iconPathTrue="mdiEye"
        :label="t('forms.display-password')"
      />
      <SageButton
        :isDisabled="initializationStore.isInitializeMutationLoading"
        class="flex-row"
        theme="primary"
        type="submit"
      >
        {{ t('common.submit') }}
        <Transition name="fade">
          <SageIcon
            v-if="initializationStore.isInitializeMutationLoading"
            :icon="mdiLoading"
            class="animate-spin"
            size="20"
          />
        </Transition>
      </SageButton>
    </SageForm>
  </SageSection>
</template>
