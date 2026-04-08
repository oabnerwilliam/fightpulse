"use client"

import { FighterCard, type Fighter } from "./FighterCard"
import { parseAsString, useQueryState } from "nuqs"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type FightersApiResponse = {
  response?: Fighter[]
}

type FighterListProps = {
  className?: string
}

export function FighterList({ className }: FighterListProps) {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  )
  const { data, isLoading } = useQuery<FightersApiResponse>({
    queryKey: ["fighters", search],
    queryFn: async () => {
      const params = new URLSearchParams({ search })
      const res = await fetch(`/api/fighters?${params}`)
      if (!res.ok) {
        throw new Error(`Falha ao buscar lutadores (${res.status})`)
      }
      return await res.json()
    },
    enabled: !!search,
    staleTime: 1000 * 60 * 5,
  })

  const fighters = data?.response ?? []

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    setSearch(data.search)
  })

  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-col items-start gap-6 px-6",
        className,
      )}
    >
      <form onSubmit={onSubmit} className="flex shrink-0 items-center gap-2">
        <Input
          placeholder="Pesquisar lutador"
          className="text-md sm:text-3xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          {...register("search")}
        />
        <Button type="submit" className="shrink-0 hover:cursor-pointer">
          Pesquisar
        </Button>
      </form>
      <div className="flex min-h-0 w-full flex-1 flex-col">
        {isLoading ? (
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
        ) : !search ? (
          <div className="w-full text-center text-2xl font-bold flex flex-1 items-start justify-center">
            Comece a pesquisar por um lutador
          </div>
        ) : fighters.length > 0 ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fighters.map((fighter) => (
              <FighterCard key={fighter.id} fighter={fighter} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-2xl font-bold flex flex-1 items-start justify-center">
            Nenhum lutador encontrado
          </div>
        )}
      </div>
    </div>
  )
}
