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
