export interface NewEntries {
  has_next: boolean
  page: number
  results: Result[]
}

export interface Result {
  id: number
  event_total: number // total number of points for gameweek
  player_name: string // player actual name (i.e. first name last name)
  rank: number // current rank in league
  last_rank: number // last rank in league
  rank_sort: number
  total: number // total number of points
  entry: number // team identifier
  entry_name: string // team name
}

export interface Standings {
  has_next: boolean
  page: number
  results: Result[]
}

export interface League {
  id: number
  name: string
  created: string
  closed: boolean
  max_entries: number
  league_type: string
  scoring: string
  admin_entry: number
  start_event: number
  code_privacy: string
  has_cup: boolean
  cup_league: unknown
  rank: number
}

export interface StandingsResponse {
  new_entries: NewEntries
  last_uploaded_data: string
  league: League
  standings: Standings
}
