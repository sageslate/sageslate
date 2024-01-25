<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

import { RealmIdInjectionKey } from '@/atoms/utils/strictInject'
import Temporary from '@/organisms/Temporary.vue'

const route = useRoute<'/realm/[id]/'>()

const realmId = computed(() => route.params.id)

provide(RealmIdInjectionKey, realmId)
</script>

<template>
  <div>
    <Temporary />
  </div>
</template>
