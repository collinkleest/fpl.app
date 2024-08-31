<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
import type { Result } from '@/types'
import { onMounted, ref, toRaw, watch } from 'vue'

const pendingChampion = ref<Result>()
const ramsStore = useRamsStore()

function findPendingChampion() {
  const results = ramsStore.leagueData?.standings?.results || []
  for (const result of results) {
    if (result.rank == 1) {
      pendingChampion.value = toRaw(result)
    }
  }
}

onMounted(() => {
  if (ramsStore.leagueData) {
    findPendingChampion()
  }
})

watch(
  () => ramsStore.leagueData,
  () => {
    findPendingChampion()
  }
)
</script>

<template>
  <div v-if="pendingChampion">
    🏆 {{ pendingChampion.entry_name }} {{ pendingChampion.total }} pts
  </div>
</template>
