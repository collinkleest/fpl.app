import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FPL_CORS_ENDPOINT, RAMS_LEAGUE_ID } from '../api'
import type { LiveData, LiveResponse, PicksResponse, Result, StandingsResponse } from '@/types'

export const useRamsStore = defineStore('ramsStore', () => {
  const leagueData = ref<StandingsResponse | null>(null)
  const liveLeagueData = ref<LiveData[] | null>(null)
  const loading = ref(false)
  const error = ref(null)
  const loadingLive = ref(false)
  const liveError = ref(null)

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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

  async function getPicksResponse(
    entry_number: number,
    event_number: number
  ): Promise<PicksResponse> {
    const response = await fetch(
      `${FPL_CORS_ENDPOINT}/api/entry/${entry_number}/event/${event_number}/picks`
    )
    return (await response.json()) as PicksResponse
  }

  async function getCurrentGameweek(entry_number: number): Promise<number> {
    const response = await fetch(`${FPL_CORS_ENDPOINT}/api/entry/${entry_number}`)
    const entry = (await response.json()) as { current_event: number }
    return entry.current_event
  }

  async function getGameweekLiveData(event_number: number) {
    const response = await fetch(`${FPL_CORS_ENDPOINT}/api/event/${event_number}/live`)
    return (await response.json()) as LiveResponse
  }

  async function fetchLiveTable() {
    loadingLive.value = true
    try {
      const response = await fetch(
        `${FPL_CORS_ENDPOINT}/api/leagues-classic/${RAMS_LEAGUE_ID}/standings/`
      )
      const leagueTable: StandingsResponse = await response.json()
      const results: Result[] = leagueTable.standings.results
      const currentGameweek = await getCurrentGameweek(results[0].entry)
      const gameWeekLiveDataElements = (await getGameweekLiveData(currentGameweek)).elements

      const tableData: {
        totalPoints: number
        entryName: string
        playerName: string
        rank: number
      }[] = []

      for (const result of results) {
        await sleep(500) // Ensures requests happen sequentially with a delay
        const picksResponse: PicksResponse = await getPicksResponse(result.entry, currentGameweek)
        const entryName = result.entry_name
        const playerName = result.player_name
        const rank = result.rank

        let totalPoints = 0
        for (const pick of picksResponse.picks) {
          totalPoints +=
            gameWeekLiveDataElements[pick.element - 1].stats.total_points * pick.multiplier
        }

        tableData.push({
          totalPoints,
          entryName,
          playerName,
          rank
        })
      }
      liveLeagueData.value = tableData
    } catch (err: any) {
      liveError.value = err?.message
    } finally {
      loadingLive.value = false
    }
  }

  return { leagueData, loading, error, fetchLeague, fetchLiveTable, liveLeagueData, liveError, loadingLive }
})
