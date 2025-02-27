<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps(['data'])

const getRowClass = (rowData: any) => {
  const index = props.data.value.indexOf(rowData)
  const length = props.data.value.length
  if (length - 1 === index || length - 2 == index || length - 3 === index) {
    return 'relegation'
  } else if (index === 0) {
    return 'champion'
  } else if (index === 1 || index === 2 || index === 3) {
    return 'champions-league'
  }
  return ''
}
</script>

<template>
  <DataTable v-if="data" :value="props.data" tableStyle="min-width: 50rem" :rowClass="getRowClass">
    <Column sortable field="rank" header="Rank"></Column>
    <Column sortable field="entryName" header="Team Name"></Column>
    <Column sortable field="gameweekTotal" header="GW Total"></Column>
    <Column sortable field="totalPoints" header="Total Points"></Column>
    <Column sortable field="pointsTillLeapfrog" header="Points till 🐸"></Column>
    <Column sortable field="pointsTillTop" header="Points till 🔝"></Column>
  </DataTable>
</template>
