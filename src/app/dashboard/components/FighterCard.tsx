import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MetallicCard } from "../../../components/MetallicCard"

export type Fighter = {
  id: string
  name: string
  nickname: string
  photo: string
}

type FighterCardProps = {
  fighter: Fighter
}

export function FighterCard({ fighter }: FighterCardProps) {
  return (
    <MetallicCard className="py-0 flex flex-col items-center gap-0 hover:cursor-pointer ease-in-out duration-300 hover:scale-101">
      <CardHeader className="pt-6 w-full">
        <CardTitle className="text-2xl font-bold">{fighter.name}</CardTitle>
        <CardDescription>&quot;{fighter.nickname}&quot;</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <img
          src={fighter.photo}
          alt={fighter.name}
          className="w-full h-full grow"
        />
      </CardContent>
    </MetallicCard>
  )
}
