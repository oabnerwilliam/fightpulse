"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { getCountryCode } from "@/app/dashboard/utils/functions"
import type { FightFromMock } from "@/app/dashboard/utils/types"
import { cn } from "@/lib/utils"
import { useFighters } from "../hooks/useFighters"
import { MetallicCard } from "../../../components/MetallicCard"

export function FightCardRow({ fight }: { fight: FightFromMock }) {
  const { fighters } = useFighters({ fight })

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
                <img
                  alt={fighter.nationality}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(fighter.nationality)}.svg`}
                  className="shrink-0 rounded-3xl size-10"
                />
                {fighter.photo ? (
                  <img
                    alt={fighter.name}
                    src={fighter.photo}
                    className="size-14 shrink-0 rounded-full object-cover sm:size-20"
                  />
                ) : null}
              </>
            ) : null}
            <div className="flex min-w-0 flex-col items-center justify-center text-center sm:min-w-0">
              <CardTitle className="wrap-break-word text-lg font-bold sm:text-2xl">
                {fighter.name}
              </CardTitle>
              <CardDescription className="flex flex-col items-center wrap-break-word">
                <span className="text-sm text-muted-foreground">
                  &quot;{fighter.nickname}&quot;
                </span>
                {fighter.record_wins}- {fighter.record_losses}-{" "}
                {fighter.record_draws}
              </CardDescription>
            </div>
            {index === 1 ? (
              <>
                {fighter.photo ? (
                  <img
                    alt={fighter.name}
                    src={fighter.photo}
                    className="size-14 shrink-0 rounded-full object-cover sm:size-20"
                  />
                ) : null}
                <img
                  alt={fighter.nationality}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(fighter.nationality)}.svg`}
                  className="shrink-0 rounded-3xl size-10"
                />
              </>
            ) : null}
          </div>
        ))}
      </CardContent>
    </MetallicCard>
  )
}
