"use client"

import { useQuery } from "@tanstack/react-query"
import { cn } from "../lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Loader2 } from "lucide-react"
import { useMemo } from "react"

type EventsApiResponse = {
  data: Event[]
}

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

type EventListProps = {
  className?: string
}

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
        "flex min-h-0 w-full flex-col items-start gap-6",
        className,
      )}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">
        {!isLoading ? (
          <div className="flex flex-col w-full gap-6">
            {(futureEvents ?? []).map((event) => (
              <Card
                key={event.id}
                className="hover:cursor-pointer hover:shadow-lg ease-in-out duration-300 flex flex-col gap-0 border-red-500"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {event.name}
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {event.venue_name} - {event.venue_city},{" "}
                    {event.venue_country}
                  </CardDescription>
                </CardContent>
              </Card>
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
