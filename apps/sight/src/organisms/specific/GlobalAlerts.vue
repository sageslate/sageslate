<script setup lang="ts">
import SageAlert from '@/molecules/alerts/SageAlert.vue'
import { useAlertsStore } from '@/stores/alerts'

const alertsStore = useAlertsStore()
</script>

<template>
  <TransitionGroup
    class="absolute left-0 top-4 w-full flex-col gap-4 px-4 md:left-1/2 md:w-1/2 md:-translate-x-1/2"
    name="fade-and-slide"
    tag="section"
    @mouseenter="() => alertsStore.pauseTimers()"
    @mouseleave="() => alertsStore.resumeTimers()"
  >
    <SageAlert
      v-for="alert in alertsStore.alerts"
      :key="alert.id"
      :alert="alert"
      @close="() => alertsStore.removeAlert(alert.id)"
    />
  </TransitionGroup>
</template>
