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
        <Card className="hover:cursor-pointer hover:shadow-lg ease-in-out duration-300 flex flex-col gap-0 py-8 relative">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{eventName}:</CardTitle>
            <p className="text-xl font-bold text-foreground">{mainEvent}</p>
            <CardDescription>
              {new Date(event.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {event.venue_name} - {event.venue_city}, {event.venue_country}
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
          <FightCardRow key={`${event.id}-${fight.id}`} fight={fight} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
