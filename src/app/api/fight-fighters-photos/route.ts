import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  fetchFighterByApiSportsId,
  fetchFightersByName,
  firstFighterFromResponse,
  type UpstreamFightersPayload,
} from "@/lib/api-sports-fighters"

function photoFromUpstreamJson(data: UpstreamFightersPayload): string | null {
  const fighter = firstFighterFromResponse(data.response)
  const photo = fighter?.photo
  return typeof photo === "string" && photo.length > 0 ? photo : null
}

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids")
  const names = request.nextUrl.searchParams.getAll("names")
  const apiKey = process.env.API_SPORTS_API_KEY

  if (!idsParam?.trim()) {
    return Response.json({ error: "ids query required" }, { status: 400 })
  }

  if (!apiKey) {
    return Response.json(
      { error: "API_SPORTS_API_KEY is not configured" },
      { status: 500 },
    )
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
  const apiIdByBallId = new Map(
    rows.map((r) => [r.ball_dont_lie_id, r.api_sports_id]),
  )

  const photosByBallId: Record<string, string> = {}

  await Promise.all(
    ballIds.map(async (ballId, i) => {
      const rawName = names[i]
      const trimmedName = typeof rawName === "string" ? rawName.trim() : ""

      let photo: string | null = null

      if (trimmedName.length > 0) {
        const nameRes = await fetchFightersByName(trimmedName, apiKey)
        const nameData = (await nameRes.json()) as UpstreamFightersPayload
        if (nameRes.ok) {
          photo = photoFromUpstreamJson(nameData)
        }
      }

      if (photo === null) {
        const apiSportsId = apiIdByBallId.get(ballId)
        if (apiSportsId !== undefined) {
          const idRes = await fetchFighterByApiSportsId(apiSportsId, apiKey)
          const idData = (await idRes.json()) as UpstreamFightersPayload
          if (idRes.ok) {
            photo = photoFromUpstreamJson(idData)
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
