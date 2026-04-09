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
import {
  fightMock,
  parseEventTitle,
  removeFirstName,
} from "@/app/dashboard/utils/functions"
import type { Event } from "@/app/dashboard/utils/types"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { FightCardRow } from "./FightCardRow"
import { MetallicCard } from "@/components/MetallicCard"
import { useFighters } from "../hooks/useFighters"

type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  const { eventName } = parseEventTitle(event.name)
  const mainFight = fightMock.data.find((fight) => fight.is_main_event)!
  const { fighters } = useFighters({ fight: mainFight })
  const leftFighter = fighters[0]
  const rightFighter = fighters[1]

  return (
    <Collapsible className="w-full flex flex-col items-center gap-4 duration-300 ease-in-out">
      <CollapsibleTrigger className="w-full" onClick={handleOpen}>
        <MetallicCard className="relative flex flex-col gap-0 py-6 duration-300 ease-in-out hover:cursor-pointer sm:py-2 hover:scale-102">
          <CardContent className="pr-12 sm:pr-14">
            <div className="grid grid-cols-2 gap-4 md:py-6 md:flex md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="order-2 flex min-w-0 flex-col items-center text-center md:order-1 md:flex-1">
                {leftFighter ? (
                  <>
                    {leftFighter.photo ? (
                      <img
                        alt={leftFighter.name}
                        src={leftFighter.photo}
                        className="size-20 shrink-0 rounded-full object-cover md:size-28"
                      />
                    ) : (
                      <div className="size-20 shrink-0 rounded-full bg-muted md:size-28" />
                    )}
                    <p className="mt-2 wrap-break-word text-lg font-bold md:mt-3 md:text-2xl">
                      {removeFirstName(leftFighter.name) ||
                        leftFighter.last_name ||
                        leftFighter.name}
                    </p>
                  </>
                ) : null}
              </div>

              <div className="order-1 col-span-2 flex min-w-0 flex-col items-center text-center md:order-2 md:col-auto md:shrink-0">
                <CardTitle className="wrap-break-word text-lg font-bold leading-tight md:text-2xl">
                  {eventName}
                </CardTitle>
                <CardDescription className="mt-2">
                  {new Date(event.date).toLocaleDateString()}
                </CardDescription>
                <CardDescription className="wrap-break-word">
                  {event.venue_name} - {event.venue_city}, {event.venue_country}
                </CardDescription>
              </div>

              <div className="order-3 flex min-w-0 flex-col items-center text-center md:flex-1">
                {rightFighter ? (
                  <>
                    {rightFighter.photo ? (
                      <img
                        alt={rightFighter.name}
                        src={rightFighter.photo}
                        className="size-20 shrink-0 rounded-full object-cover md:size-28"
                      />
                    ) : (
                      <div className="size-20 shrink-0 rounded-full bg-muted md:size-28" />
                    )}
                    <p className="mt-2 wrap-break-word text-lg font-bold md:mt-3 md:text-2xl">
                      {removeFirstName(rightFighter.name) ||
                        rightFighter.last_name ||
                        rightFighter.name}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </CardContent>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 sm:right-8">
            {isOpen ? (
              <FaChevronUp className="size-6" />
            ) : (
              <FaChevronDown className="size-6" />
            )}
          </div>
        </MetallicCard>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full min-w-0 flex flex-col gap-4">
        {fightMock.data.map((fight) => (
          <FightCardRow key={`${event.id}-${fight.id}`} fight={fight} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
