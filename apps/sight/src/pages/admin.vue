<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { definePage, RouterView } from 'vue-router/auto'

import SageButton from '@/atoms/common/elements/SageButton.vue'
import SageInput from '@/molecules/forms/SageInput.vue'
import FrostedPage from '@/templates/FrostedPage.vue'

definePage({
  meta: {
    isInitializedOnly: true,
    isInitialStatePage: true,
    isAdminOnly: true,
  },
})

const { t } = useI18n()

const searchString = ref('')
</script>

<template>
  <FrostedPage>
    <div class="flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="shrink-0 flex-row items-stretch gap-2">
        <SageInput v-model="searchString" class="grow" placeholder="Search" />
        <SageButton to="/admin/create-realm">
          {{ t('admin.new-realm') }}
        </SageButton>
      </div>
      <div class="grow flex-col items-stretch">
        <RouterView />
      </div>
    </div>
  </FrostedPage>
</template>
