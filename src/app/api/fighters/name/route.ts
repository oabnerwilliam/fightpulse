import { NextRequest } from "next/server"
import { fetchFightersByName } from "@/lib/api-sports-fighters"

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? ""
  const apiKey = process.env.API_SPORTS_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "API_SPORTS_API_KEY is not configured" },
      { status: 500 },
    )
  }

  if (!name.trim()) {
    return Response.json({ error: "name query required" }, { status: 400 })
  }

  const upstream = await fetchFightersByName(name.trim(), apiKey)
  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}
