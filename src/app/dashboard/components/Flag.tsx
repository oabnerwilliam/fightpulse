"use client"

import { getCountryCode } from "@/app/dashboard/utils/functions"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type FlagProps = {
  nationality?: string | null
  className?: string
  isLoading?: boolean
}

export function Flag({ nationality, className, isLoading = false }: FlagProps) {
  const countryCode = nationality ? getCountryCode(nationality) : undefined

  if (isLoading || !countryCode) {
    return (
      <Skeleton className={cn("shrink-0 rounded-3xl w-10 h-7", className)} />
    )
  }

  return (
    <img
      alt={nationality ?? "Flag"}
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
      className={cn("shrink-0 rounded-full w-10 h-7", className)}
    />
  )
}
