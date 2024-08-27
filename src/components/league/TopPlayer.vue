<script setup lang="ts">
import { ref, watch, toRaw, onMounted } from 'vue'
import type { Result } from '@/types'
import { useRamsStore } from '@/stores/rams'

const ramsStore = useRamsStore()
const topPlayerOfTheWeek = ref<Result>()

function findTopPlayerOfTheWeek() {
  let topPlayer: Result | undefined
  const results = ramsStore.leagueData?.standings?.results || []
  for (const result of results) {
    if (!topPlayer) {
      topPlayer = result
    } else {
      if (result?.event_total > topPlayer?.event_total) {
        topPlayer = result
      }
    }
  }
  topPlayerOfTheWeek.value = toRaw(topPlayer)
}

onMounted(() => {
  if (ramsStore.leagueData) {
    findTopPlayerOfTheWeek()
  }
})

watch(
  () => ramsStore.leagueData,
  () => {
    if (ramsStore.leagueData) {
      findTopPlayerOfTheWeek()
    }
  }
)
</script>

<template>
  <div v-if="topPlayerOfTheWeek">
    🔥 {{ topPlayerOfTheWeek.entry_name }} {{ topPlayerOfTheWeek.total }}
  </div>
</template>
