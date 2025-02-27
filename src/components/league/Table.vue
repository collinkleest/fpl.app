<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps(['data'])

const isLastThree = (index: number, length: number): boolean => {
  return length - 1 === index || length - 2 == index || length - 3 === index
}

const isFirstThree = (index: number): boolean => {
  return new Set([1, 2, 3]).has(index)
}

const getRowClass = (rowData: any) => {
  const index = props.data.value.indexOf(rowData)
  const length = props.data.value.length
  if (isLastThree(index, length)) {
    return 'relegation'
  } else if (isFirstThree(index)) {
    return 'champions-league'
  } else if (index === 0) {
    return 'champion'
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
