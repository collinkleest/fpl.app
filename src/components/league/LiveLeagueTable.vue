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

const mapTableData = (results: any) => {
  return results.map((result: any, index: number, arr: any[]) => {
    return {
      rank: result.rank,
      entryName: result.entryName,
      gameweekTotal: result.event_total,
      totalPoints: result.total,
      pointsTillLeapfrog: index == 0 ? 0 : arr[index - 1]?.total - result.total,
      pointsTillTop: index === 0 ? 0 : results[0]?.total - result.total
    }
  })
}
const ramsStore = useRamsStore()
const tableData = computed(() => mapTableData(ramsStore.liveLeagueData) || [])
</script>

<template>
  <DataTable v-if="ramsStore.liveLeagueData">
    <DataTable :value="tableData" tableStyle="min-width: 50rem">
      <Column field="rank" header="Rank"></Column>
      <Column field="entryName" header="Team Name"></Column>
      <Column field="gameweekTotal" header="GW Total"></Column>
      <Column field="totalPoints" header="Total Points"></Column>
      <Column field="pointsTillLeapfrog" header="Points till 🐸"></Column>
      <Column field="pointsTillTop" header="Points till 🔝"></Column>
    </DataTable>
  </DataTable>
</template>
