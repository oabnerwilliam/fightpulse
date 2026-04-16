"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import type { FightFromMock } from "@/app/dashboard/utils/types"
import { cn } from "@/lib/utils"
import { useFighters } from "../hooks/useFighters"
import { MetallicCard } from "../../../components/MetallicCard"
import { FighterPhotoAvatar } from "./FighterPhotoAvatar"
import { Flag } from "./Flag"

export function FightCardRow({ fight }: { fight: FightFromMock }) {
  const { fighters, isLoading } = useFighters({ fight })
  return (
    <MetallicCard className="duration-300 ease-in-out hover:cursor-pointer hover:scale-101">
      <CardContent className="flex w-full min-w-0 flex-col gap-5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4">
        {fighters.map((fighter, index) => (
          <div
            className={cn(
              "flex min-w-0 items-center gap-3 sm:flex-1 sm:gap-6",
              index === 0
                ? "justify-center sm:justify-start"
                : "justify-center sm:justify-end",
            )}
            key={fighter.id}
          >
            {index === 0 ? (
              <>
                <Flag nationality={fighter.nationality} isLoading={isLoading} />
                <FighterPhotoAvatar
                  src={fighter.photo}
                  alt={fighter.name}
                  className="size-14 sm:size-20"
                  isLoading={isLoading}
                />
              </>
            ) : null}
            <div
              className={cn(
                "flex min-w-0 flex-col justify-center",
                index === 0 ? "items-start text-left" : "items-end text-right",
              )}
            >
              <CardTitle
                className={cn(
                  "wrap-break-word text-lg font-bold sm:text-2xl",
                  index === 0 ? "text-left" : "text-right",
                )}
              >
                {fighter.name}
              </CardTitle>
              <CardDescription
                className={cn(
                  "flex flex-col wrap-break-word",
                  index === 0 ? "items-start text-left" : "items-end text-right",
                )}
              >
                {fighter.nickname && (
                  <span className="text-sm text-muted-foreground">
                    &quot;{fighter.nickname}&quot;
                  </span>
                )}
                {fighter.record_wins}- {fighter.record_losses}-{" "}
                {fighter.record_draws}
              </CardDescription>
            </div>
            {index === 1 ? (
              <>
                <FighterPhotoAvatar
                  src={fighter.photo}
                  alt={fighter.name}
                  className="size-14 sm:size-20"
                  imgClassName="-scale-x-100"
                  isLoading={isLoading}
                />
                <Flag nationality={fighter.nationality} isLoading={isLoading} />
              </>
            ) : null}
          </div>
        ))}
      </CardContent>
    </MetallicCard>
  )
}
