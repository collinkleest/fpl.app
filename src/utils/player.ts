import type { Result } from '@/types'

export const findTopPlayerOfTheWeek = (results: Result[] | undefined): Result | undefined => {
  let topPlayer: Result | undefined = undefined
  results?.forEach((result) => {
    if (!topPlayer) {
      topPlayer = result
    } else if (result?.event_total > topPlayer?.event_total) {
      topPlayer = result
    }
  })
  return topPlayer
}

export const getEntryName = (
  entryName: string,
  isTopRank: boolean,
  isTopPlayer: boolean,
  isMostPositionsGainedPlayer: boolean
): string => {
  let modifiedEntryName = ''
  if (isTopRank) {
    modifiedEntryName += '🏆'
  }
  if (isTopPlayer) {
    modifiedEntryName += '🔥'
  }
  if (isMostPositionsGainedPlayer) {
    modifiedEntryName += '⬆️'
  }
  return `${modifiedEntryName} ${entryName}`
}

const calculatePositionsGained = (player: Result): number => {
  return player.last_rank - player.rank
}

export const findMostPositionsGainedPlayer = (
  results: Result[] | undefined
): Result | undefined => {
  let mostPositionsGained: Result | undefined
  results?.forEach((result) => {
    if (!mostPositionsGained) {
      mostPositionsGained = result
    } else {
      if (calculatePositionsGained(result) > calculatePositionsGained(mostPositionsGained)) {
        mostPositionsGained = result
      }
    }
  })
  return mostPositionsGained
}
