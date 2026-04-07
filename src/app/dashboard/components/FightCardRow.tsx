"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { getCountryCode } from "@/app/dashboard/utils/functions"
import type { FightFromMock } from "@/app/dashboard/utils/types"
import { useMemo } from "react"

export function FightCardRow({ fight }: { fight: FightFromMock }) {
  const fighters = useMemo(() => {
    return [fight.fighter1, fight.fighter2]
  }, [fight])

  return (
    <Card className="hover:cursor-pointer hover:shadow-lg ease-in-out duration-300 py-4">
      <CardContent className="flex w-full justify-between items-center px-26">
        {fighters.map((fighter, index) => (
          <div className="flex gap-6" key={fighter.id}>
            {index === 0 ? (
              <img
                alt={fighter.nationality}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(fighter.nationality)}.svg`}
                className="rounded-3xl size-20"
              />
            ) : null}
            <div className="flex flex-col justify-center items-center">
              <CardTitle className="text-2xl font-bold">
                {fighter.name}
              </CardTitle>
              <CardDescription className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">
                  &quot;{fighter.nickname}&quot;
                </span>
                {fighter.record_wins}- {fighter.record_losses}-{" "}
                {fighter.record_draws}
              </CardDescription>
            </div>
            {index === 1 ? (
              <img
                alt={fighter.nationality}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(fighter.nationality)}.svg`}
                className="rounded-3xl size-20"
              />
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
