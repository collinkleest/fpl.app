import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FPL_CORS_ENDPOINT, RAMS_LEAGUE_ID } from '../api'
import type { StandingsResponse } from '@/types'

export const useRamsStore = defineStore('ramsStore', () => {
  const leagueData = ref<StandingsResponse | null>(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchLeague() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(
        `${FPL_CORS_ENDPOINT}/api/leagues-classic/${RAMS_LEAGUE_ID}/standings/`
      )
      const data: StandingsResponse = await response.json()
      leagueData.value = data
    } catch (err: any) {
      error.value = err?.message
    } finally {
      loading.value = false
    }
  }

  return { leagueData, loading, error, fetchLeague }
})
