<style>
.champion td:first-child {
  border-left: 4px solid #28a745 !important; /* Green left border */
}

.relegation td:first-child {
  border-left: 4px solid #dc3545 !important; /* Red left border */
}

.champions-league td:first-child {
  border-left: 4px solid #007bff !important; /* Blue left border */
}
</style>

<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const getRowClass = (rowData: any) => {
  const index = tableData.value.indexOf(rowData)
  const length = tableData.value.length
  if (length - 1 === index || length - 2 == index || length - 3 === index) {
    return 'relegation'
  } else if (index === 0) {
    return 'champion'
  } else if (index === 1 || index === 2 || index === 3) {
    return 'champions-league'
  }
  return ''
}

const mapTableData = (results: any) => {
  return results.map((result: any, index: number, arr: any[]) => {
    return {
      index,
      rank: index + 1,
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
  <DataTable
    v-if="ramsStore.liveLeagueData"
    :value="tableData"
    tableStyle="min-width: 50rem"
    :rowClass="getRowClass"
  >
    <Column sortable field="rank" header="Rank"></Column>
    <Column sortable field="entryName" header="Team Name"></Column>
    <Column sortable field="gameweekTotal" header="GW Total"></Column>
    <Column sortable field="totalPoints" header="Total Points"></Column>
    <Column sortable field="pointsTillLeapfrog" header="Points till 🐸"></Column>
    <Column sortable field="pointsTillTop" header="Points till 🔝"></Column>
  </DataTable>
</template>
