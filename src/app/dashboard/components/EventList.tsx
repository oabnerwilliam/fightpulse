"use client"

import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { fightMock } from "@/app/dashboard/utils/functions"
import type { EventListProps, EventsApiResponse } from "@/app/dashboard/utils/types"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { FightCardRow } from "./FightCardRow"

export const EventList = ({ className }: EventListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
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
          <div className="flex flex-col w-full gap-10">
            {(futureEvents ?? []).map((event) => (
              <Collapsible
                className="w-full flex flex-col items-center gap-4 duration-300 ease-in-out"
                key={event.id}
              >
                <CollapsibleTrigger className="w-full" onClick={handleOpen}>
                  <Card className="hover:cursor-pointer hover:shadow-lg ease-in-out duration-300 flex flex-col gap-0 py-8 relative">
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
                    <div className="text-gray-300 absolute right-8 top-1/2 -translate-y-1/2">
                      {isOpen ? (
                        <FaChevronUp className="size-6" />
                      ) : (
                        <FaChevronDown className="size-6" />
                      )}
                    </div>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent className="w-[90%]">
                  {fightMock.data.map((fight) => (
                    <FightCardRow
                      key={`${event.id}-${fight.id}`}
                      fight={fight}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
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
