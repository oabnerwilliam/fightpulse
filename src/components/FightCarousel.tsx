"use client"

import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useFighters } from "@/app/dashboard/hooks/useFighters"
import { fightMock, getCountryCode } from "@/app/dashboard/utils/functions"
import type { FightFromMock } from "@/app/dashboard/utils/types"
import { FighterPhotoAvatar } from "@/app/dashboard/components/FighterPhotoAvatar"
import { MetallicCard } from "@/components/MetallicCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

type FightCarouselProps = {
  className?: string
}

function FightCarouselFightCard({ fight }: { fight: FightFromMock }) {
  const { fighters, isLoading } = useFighters({ fight })

  return (
    <MetallicCard className="duration-300 ease-in-out">
      <CardContent className="flex w-full min-w-0 flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        {fighters.map((fighter, index) => (
          <div
            className={cn(
              "flex min-w-0 items-center gap-2 sm:flex-1 sm:gap-3",
              index === 0
                ? "justify-center sm:justify-start"
                : "justify-center sm:justify-end",
            )}
            key={fighter.id}
          >
            {index === 0 ? (
              <>
                <FighterPhotoAvatar
                  src={fighter.photo}
                  alt={fighter.name}
                  className="size-11 shrink-0 sm:size-14"
                  isLoading={isLoading}
                />
              </>
            ) : null}
            <div className="flex min-w-0 flex-col items-center justify-center text-center">
              <CardTitle className="wrap-break-word text-base font-bold leading-tight sm:text-lg">
                {fighter.name}
              </CardTitle>
              <CardDescription className="flex flex-col items-center gap-0.5 wrap-break-word">
                <span className="text-xs text-muted-foreground">
                  &quot;{fighter.nickname}&quot;
                </span>
                <span className="text-xs tabular-nums">
                  {fighter.record_wins}-{fighter.record_losses}-
                  {fighter.record_draws}
                </span>
              </CardDescription>
            </div>
            {index === 1 ? (
              <>
                <FighterPhotoAvatar
                  src={fighter.photo}
                  alt={fighter.name}
                  className="size-11 shrink-0 sm:size-14"
                  isLoading={isLoading}
                />
              </>
            ) : null}
          </div>
        ))}
      </CardContent>
    </MetallicCard>
  )
}

export function FightCarousel({ className }: FightCarouselProps) {
  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {fightMock.data.map((fight) => (
            <CarouselItem key={fight.id}>
              <FightCarouselFightCard fight={fight} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-1 border-border bg-background/90 shadow-sm sm:left-2"
          variant="outline"
        />
        <CarouselNext
          className="right-1 border-border bg-background/90 shadow-sm sm:right-2"
          variant="outline"
        />
      </Carousel>
    </div>
  )
}
