<script setup lang="ts">
import { onMounted } from 'vue'
import { useRamsStore } from '@/stores/rams'
import {
  LeagueLegend,
  TopPlayer,
  MostPositionsGained,
  PendingChampion,
  LeagueTable,
  LiveLeagueTable
} from '@/components'

const ramsStore = useRamsStore()

onMounted(() => {
  if (!ramsStore.leagueData) {
    ramsStore.fetchLeague()
  }

  if (!ramsStore.liveLeagueData) {
    ramsStore.fetchLiveTable()
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

  <h2>Live Rams Table Table</h2>
  <div v-if="ramsStore.loadingLive">Loading Live Table...</div>
  <div v-else-if="ramsStore.liveError">{{ ramsStore.liveError }}</div>
  <div v-else>
    <LiveLeagueTable />
  </div>
</template>
