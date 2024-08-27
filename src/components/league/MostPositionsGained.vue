<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
import type { Result } from '@/types'
import { onMounted, ref, toRaw, watch } from 'vue'

const ramsStore = useRamsStore()
const mostPositionsGainedPlayer = ref<Result>()

function calculatePositionsGained(player: Result): number {
  return player.last_rank - player.rank
}

function findMostPositionsGainedPlayer() {
  let mostPositionsGained: Result | undefined
  const results = ramsStore.leagueData?.standings?.results || []
  for (const result of results) {
    if (!mostPositionsGained) {
      mostPositionsGained = result
    } else {
      if (calculatePositionsGained(result) > calculatePositionsGained(mostPositionsGained)) {
        mostPositionsGained = result
      }
    }
  }
  mostPositionsGainedPlayer.value = toRaw(mostPositionsGained)
}

onMounted(() => {
  if (ramsStore.leagueData) {
    findMostPositionsGainedPlayer()
  }
})

watch(
  () => ramsStore.leagueData,
  () => {
    if (ramsStore.leagueData) {
      findMostPositionsGainedPlayer()
    }
  }
)
</script>

<template>
  <div v-if="mostPositionsGainedPlayer">
    ⬆️ {{ mostPositionsGainedPlayer.entry_name }} {{ mostPositionsGainedPlayer.total }}
  </div>
</template>
