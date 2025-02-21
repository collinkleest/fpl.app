<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRamsStore } from '@/stores/rams'
import { LeagueLegend, LeagueTable, LiveLeagueTable } from '@/components'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'

const ramsStore = useRamsStore()
const showLiveTable = ref<boolean>(false)

onMounted(() => {
  if (!ramsStore.leagueData) {
    ramsStore.fetchLeague()
  }
})

const toggleLiveTable = () => {
  showLiveTable.value = true
  if (!ramsStore.liveLeagueData) {
    ramsStore.fetchLiveTable()
  }
}
</script>

<template>
  <h1>Rams FPL</h1>
  <LeagueLegend />
  <div v-if="ramsStore.loading">Loading...</div>
  <div v-else-if="ramsStore.error">{{ ramsStore.error }}</div>
  <div v-else>
    <LeagueTable />
  </div>

  <h2>Live Rams Table</h2>
  <Button v-if="!showLiveTable" label="Load Live Table" @click="toggleLiveTable" />
  <div v-if="showLiveTable">
    <div v-if="ramsStore.loadingLive">
      <ProgressBar :value="ramsStore.liveProgress"></ProgressBar>
    </div>
    <div v-else-if="ramsStore.liveError">{{ ramsStore.liveError }}</div>
    <div v-else>
      <LiveLeagueTable />
    </div>
  </div>
</template>
