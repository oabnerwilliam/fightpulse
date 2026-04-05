import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? ""
  const apiKey = process.env.API_SPORTS_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "API_SPORTS_API_KEY is not configured" },
      { status: 500 },
    )
  }

  const url = new URL("https://v1.mma.api-sports.io/fighters")
  if (search) {
    url.searchParams.set("search", search)
  }

  const upstream = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey,
    },
  })

  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}
