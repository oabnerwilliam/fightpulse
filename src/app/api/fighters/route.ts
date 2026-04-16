import { NextRequest } from "next/server"
import {
  fetchAllFightersJson,
  filterFightersBySearch,
  photoFromOctagonFighter,
  type OctagonFighter,
} from "@/lib/octagon-fighters"

function toListItem(slug: string, fighter: OctagonFighter) {
  return {
    id: slug,
    name: fighter.name,
    nickname: fighter.nickname ?? "",
    photo: photoFromOctagonFighter(fighter) ?? "",
  }
}

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? ""
  try {
    const map = await fetchAllFightersJson()
    const q = search.trim()
    if (!q) {
      const response = Object.entries(map).map(([slug, f]) =>
        toListItem(slug, f),
      )
      return Response.json({ response })
    }
    const filtered = filterFightersBySearch(map, q)
    const response = filtered.map(({ slug, fighter }) =>
      toListItem(slug, fighter),
    )
    return Response.json({ response })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Octagon request failed"
    return Response.json({ error: message }, { status: 502 })
  }
}
