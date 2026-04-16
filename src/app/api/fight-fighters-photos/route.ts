import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  fetchAllFightersJson,
  fetchFighterBySlug,
  findBestFighterByName,
  photoFromOctagonFighter,
} from "@/lib/octagon-fighters"

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids")
  const names = request.nextUrl.searchParams.getAll("names")

  if (!idsParam?.trim()) {
    return Response.json({ error: "ids query required" }, { status: 400 })
  }

  const ballIds = idsParam
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n))

  if (ballIds.length === 0) {
    return Response.json({ photosByBallId: {} as Record<string, string> })
  }

  if (names.length !== ballIds.length) {
    return Response.json(
      {
        error:
          "names count must match ids count (use repeated names= for each fighter)",
      },
      { status: 400 },
    )
  }

  const rows = await prisma.fighterExternalIdMap.findMany({
    where: { ball_dont_lie_id: { in: ballIds } },
  })
  const slugByBallId = new Map(
    rows.map((r) => [r.ball_dont_lie_id, r.octagon_slug]),
  )

  let map: Awaited<ReturnType<typeof fetchAllFightersJson>>
  try {
    map = await fetchAllFightersJson()
  } catch {
    return Response.json(
      { error: "Failed to load fighter roster" },
      { status: 502 },
    )
  }

  const photosByBallId: Record<string, string> = {}

  await Promise.all(
    ballIds.map(async (ballId, i) => {
      const rawName = names[i]
      const trimmedName = typeof rawName === "string" ? rawName.trim() : ""

      let photo: string | null = null

      if (trimmedName.length > 0) {
        const hit = findBestFighterByName(map, trimmedName)
        if (hit) {
          photo = photoFromOctagonFighter(hit.fighter)
        }
      }

      if (photo === null) {
        const slug = slugByBallId.get(ballId)
        if (slug) {
          const fromRoster = map[slug]
          if (fromRoster) {
            photo = photoFromOctagonFighter(fromRoster)
          } else {
            const fetched = await fetchFighterBySlug(slug)
            photo = fetched ? photoFromOctagonFighter(fetched) : null
          }
        }
      }

      if (photo !== null) {
        photosByBallId[String(ballId)] = photo
      }
    }),
  )

  return Response.json({ photosByBallId })
}
