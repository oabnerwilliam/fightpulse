"use client"

import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useMemo } from "react"
import type {
  EventListProps,
  EventsApiResponse,
} from "@/app/dashboard/utils/types"
import { EventCard } from "./EventCard"

export const EventList = ({ className }: EventListProps) => {
  const { data, isLoading } = useQuery<EventsApiResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events")
      if (!res.ok) {
        throw new Error(`Falha ao buscar eventos (${res.status})`)
      }
      return await res.json()
    },
    staleTime: 1000 * 60 * 5,
  })

  const futureEvents = useMemo(
    () =>
      data?.data
        ?.filter(
          (event) => event.status === "scheduled" && event?.league?.id === 1,
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ) ?? [],
    [data],
  )

  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-col items-start gap-6 px-6",
        className,
      )}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">
        {!isLoading ? (
          <div className="flex flex-col w-full gap-10">
            {(futureEvents ?? []).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-1 flex-col items-center justify-center gap-2 bg-background"
            aria-busy
            aria-live="polite"
          >
            <Loader2
              className="size-10 animate-spin text-primary"
              aria-hidden
            />
          </div>
        )}
      </div>
    </div>
  )
}
