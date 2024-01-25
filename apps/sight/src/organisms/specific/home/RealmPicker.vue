<script setup lang="ts">
import { mdiMenuRight } from '@mdi/js'
import { RouterLink } from 'vue-router/auto'

import SageIcon from '@/atoms/common/elements/SageIcon.vue'
import { useRealmsQuery } from '@/graphql/core'

const { realmsQueryResult } = useRealmsQuery()
</script>

<template>
  <section class="flex-col gap-2">
    <RouterLink
      v-for="realm in realmsQueryResult?.realms"
      :key="realm.id"
      :to="`/realm/${realm.id}`"
      class="hover:border-primary300 hover:bg-primary-800 flex flex-row items-center gap-2 rounded border border-gray-300 p-2"
    >
      <span class="grow">{{ realm.name }} {{ realm.name }} {{ realm.name }} {{ realm.name }} {{ realm.name }}</span>
      <SageIcon :icon="mdiMenuRight" class="shrink-0" size="32" />
    </RouterLink>
  </section>
</template>
