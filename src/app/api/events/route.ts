export async function GET() {
  const apiKey = process.env.BALLDONTLIE_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "BALLDONTLIE_API_KEY is not configured" },
      { status: 500 },
    )
  }
  const date = new Date()
  const year = date.getFullYear()

  const url = new URL(`https://api.balldontlie.io/mma/v1/events?year=${year}`)

  const upstream = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })

  const data = await upstream.json()
  return Response.json(data, { status: upstream.status })
}
