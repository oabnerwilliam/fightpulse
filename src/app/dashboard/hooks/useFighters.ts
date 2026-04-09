import { useQuery } from "@tanstack/react-query"
import { FightFromMock } from "../utils/types"
import { useMemo } from "react"
import { FightFightersPhotosResponse } from "../utils/types"

export const useFighters = ({ fight }: { fight: FightFromMock }) => {
  const idsKey = `${fight.fighter1.id},${fight.fighter2.id}`
  const photosQueryKey = [
    "fight-fighters-photos",
    idsKey,
    fight.fighter1.name,
    fight.fighter2.name,
  ] as const

  const { data, isLoading } = useQuery({
    queryKey: photosQueryKey,
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set("ids", idsKey)
      params.append("names", fight.fighter1.name)
      params.append("names", fight.fighter2.name)
      const res = await fetch(`/api/fight-fighters-photos?${params.toString()}`)
      if (!res.ok) {
        throw new Error(`Falha ao buscar fotos (${res.status})`)
      }
      return (await res.json()) as FightFightersPhotosResponse
    },
    staleTime: 1000 * 60 * 60,
  })

  const fighters = useMemo(() => {
    const base = [fight.fighter1, fight.fighter2]
    const map = data?.photosByBallId
    if (!map)
      return base.map((f) => ({ ...f, photo: undefined as string | undefined }))
    return base.map((f) => ({
      ...f,
      photo: map[String(f.id)],
    }))
  }, [fight, data?.photosByBallId])

  return { fighters, isLoading }
}
