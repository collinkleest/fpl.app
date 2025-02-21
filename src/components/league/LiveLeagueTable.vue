<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const mapTableData = (results: any) => {
  return results.map((result: any, index: number, arr: any[]) => {
    return {
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
  <DataTable v-if="ramsStore.liveLeagueData">
    <DataTable :value="tableData" tableStyle="min-width: 50rem">
      <Column sortable field="rank" header="Rank"></Column>
      <Column sortable field="entryName" header="Team Name"></Column>
      <Column sortable field="gameweekTotal" header="GW Total"></Column>
      <Column sortable field="totalPoints" header="Total Points"></Column>
      <Column sortable field="pointsTillLeapfrog" header="Points till 🐸"></Column>
      <Column sortable field="pointsTillTop" header="Points till 🔝"></Column>
    </DataTable>
  </DataTable>
</template>
