<style scoped>
table {
  width: 100%;
  border-collapse: collapse; /* Ensures borders are clean */
  border-spacing: 0; /* Removes extra spacing */
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid var(--vt-c-text-dark-2); /* Subtle line between rows */
}
</style>

<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Result } from '@/types'
import { findTopPlayerOfTheWeek } from '@/utils'

const mapTableData = (results: Result[] | undefined) => {
  const topPlayer = findTopPlayerOfTheWeek(results)
  return results?.map((result, index, resultsArray) => {
    const entryName = result == topPlayer ? `🔥 ${result.entry_name}` : result.entry_name
    return {
      rank: result.rank,
      entryName,
      playerName: result.player_name,
      gameweekTotal: result.event_total,
      totalPoints: result.total,
      pointsTillLeapfrog: resultsArray[index - 1]?.total - result.total,
      pointsTillTop: results[0]?.total - result.total
    }
  })
}

const ramsStore = useRamsStore()
const tableData = computed(() => mapTableData(ramsStore.leagueData?.standings?.results) || [])
</script>

<template>
  <DataTable v-if="ramsStore.leagueData">
    <DataTable :value="tableData" tableStyle="min-width: 50rem">
      <Column field="rank" header="Rank"></Column>
      <Column field="entryName" header="Entry Name"></Column>
      <Column field="gameweekTotal" header="GW Total"></Column>
      <Column field="totalPoints" header="Total Points"></Column>
      <Column field="pointsTillLeapfrog" header="Points till 🐸"></Column>
      <Column field="pointsTillTop" header="Points till 🔝"></Column>
    </DataTable>
  </DataTable>
</template>
