<script setup lang="ts">
import { computed } from 'vue'
import { definePage } from 'vue-router/auto'

import SageSection from '@/atoms/common/containers/SageSection.vue'
import SageRuler from '@/atoms/common/elements/SageRuler.vue'
import { useRealmsQuery } from '@/graphql/core'
import AuthenticationForm from '@/organisms/specific/admin/AuthenticationForm.vue'
import RealmPicker from '@/organisms/specific/home/RealmPicker.vue'
import CenteredFrostedContainer from '@/templates/CenteredFrostedContainer.vue'

definePage({
  meta: {
    isInitializedOnly: true,
    isInitialStatePage: true,
    isGuestOnly: true,
  },
})

const { realmsQueryResult } = useRealmsQuery()

const isRealmsSectionDisplayed = computed(() => Boolean(realmsQueryResult.value?.realms.length))
</script>

<template>
  <CenteredFrostedContainer>
    <SageSection>
      <template v-if="isRealmsSectionDisplayed">
        <RealmPicker />
        <SageRuler />
      </template>
      <AuthenticationForm />
    </SageSection>
  </CenteredFrostedContainer>
</template>
