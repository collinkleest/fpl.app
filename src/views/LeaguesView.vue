<script setup lang="ts">
import { onMounted } from 'vue'
import { useRamsStore } from '@/stores/rams'
import {
  LeagueLegend,
  TopPlayer,
  MostPositionsGained,
  PendingChampion,
  LeagueTable
} from '@/components'

const ramsStore = useRamsStore()

onMounted(() => {
  if (!ramsStore.leagueData) {
    ramsStore.fetchLeague()
  }
})
</script>

<template>
  <h1>Rams FPL</h1>
  <LeagueLegend />
  <div v-if="ramsStore.loading">Loading...</div>
  <div v-else-if="ramsStore.error">{{ ramsStore.error }}</div>
  <div v-else>
    <TopPlayer />
    <MostPositionsGained />
    <PendingChampion />
    <LeagueTable />
  </div>
</template>
