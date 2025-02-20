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
const ramsStore = useRamsStore()
const liveLeagueDataResults = computed(() => ramsStore.liveLeagueData || [])
</script>

<template>
  <table v-if="ramsStore.liveLeagueData">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Team Name</th>
        <th>Player Name</th>
        <th>GW Points</th>
        <th>Total Points</th>
        <th>Points till 🐸</th>
        <th>Points till 🔝</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in liveLeagueDataResults" v-bind:key="player.playerName">
        <td>{{ player.rank }}</td>
        <td>{{ player.entryName }}</td>
        <td>
          {{
            player.playerName
          }}
        </td>
        <td>{{ player.event_total }}</td>
        <td>{{ player.total }}</td>
        <td>{{ index === 0 ? 0 : liveLeagueDataResults[index - 1]?.total - player.total }}</td>
        <td>{{ index === 0 ? 0 : liveLeagueDataResults[0]?.total - player.total }}</td>
      </tr>
    </tbody>
  </table>
</template>
