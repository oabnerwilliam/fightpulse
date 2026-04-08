"use client"

import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fightMock, parseEventTitle } from "@/app/dashboard/utils/functions"
import type { Event } from "@/app/dashboard/utils/types"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { FightCardRow } from "./FightCardRow"

type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  const { eventName, mainEvent } = parseEventTitle(event.name)

  return (
    <Collapsible className="w-full flex flex-col items-center gap-4 duration-300 ease-in-out">
      <CollapsibleTrigger className="w-full" onClick={handleOpen}>
        <Card className="relative flex flex-col gap-0 py-6 duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg sm:py-8">
          <CardHeader className="pr-12 sm:pr-14">
            <CardTitle className="wrap-break-word text-xl font-bold sm:text-2xl">
              {eventName}:
            </CardTitle>
            <p className="wrap-break-word text-lg font-bold text-foreground sm:text-xl">
              {mainEvent}
            </p>
            <CardDescription>
              {new Date(event.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {event.venue_name} - {event.venue_city}, {event.venue_country}
            </CardDescription>
          </CardContent>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 sm:right-8">
            {isOpen ? (
              <FaChevronUp className="size-6" />
            ) : (
              <FaChevronDown className="size-6" />
            )}
          </div>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full min-w-0">
        {fightMock.data.map((fight) => (
          <FightCardRow key={`${event.id}-${fight.id}`} fight={fight} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
