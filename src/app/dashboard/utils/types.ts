import { fightMock } from "./functions"

export type FightFromMock = (typeof fightMock.data)[number]

export type Event = {
  id: number
  name: string
  date: string
  venue_name: string
  venue_city: string
  venue_country: string
  status: string
  league: {
    id: number
    name: string
  }
}

export type EventsApiResponse = {
  data: Event[]
}

export type EventListProps = {
  className?: string
}

export type FightFightersPhotosResponse = {
  photosByBallId: Record<string, string>
}
