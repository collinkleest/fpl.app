<script setup lang="ts">
import { useRamsStore } from '@/stores/rams'
const ramsStore = useRamsStore()
</script>

<template>
  <table v-if="ramsStore.leagueData">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Team Name</th>
        <th>Player Name</th>
        <th>GW Points</th>
        <th>Total Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in ramsStore?.leagueData?.standings?.results" v-bind:key="player.id">
        <td>{{ player.rank }}</td>
        <td>{{ player.entry_name }}</td>
        <td>{{ player.player_name }}</td>
        <td>{{ player.event_total }}</td>
        <td>{{ player.total }}</td>
      </tr>
    </tbody>
  </table>
</template>
