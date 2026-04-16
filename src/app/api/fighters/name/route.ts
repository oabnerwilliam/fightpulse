import { NextRequest } from "next/server"
import {
  fetchAllFightersJson,
  findBestFighterByName,
  photoFromOctagonFighter,
} from "@/lib/octagon-fighters"

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? ""

  if (!name.trim()) {
    return Response.json({ error: "name query required" }, { status: 400 })
  }

  try {
    const map = await fetchAllFightersJson()
    const hit = findBestFighterByName(map, name.trim())
    if (!hit) {
      return Response.json({ response: [] })
    }
    const photo = photoFromOctagonFighter(hit.fighter)
    return Response.json({
      response: [
        {
          id: hit.slug,
          name: hit.fighter.name,
          nickname: hit.fighter.nickname ?? "",
          photo: photo ?? "",
        },
      ],
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Octagon request failed"
    return Response.json({ error: message }, { status: 502 })
  }
}
