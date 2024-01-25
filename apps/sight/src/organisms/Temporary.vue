<script setup lang="ts">
import { useUsersQuery } from '@/graphql/realm'

const { usersQueryResult } = useUsersQuery()
</script>

<template>
  <div>{{ usersQueryResult }}</div>
</template>
