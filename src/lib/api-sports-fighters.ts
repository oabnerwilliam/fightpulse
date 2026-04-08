export const MMA_FIGHTERS_URL = "https://v1.mma.api-sports.io/fighters"

export type UpstreamFightersPayload = {
  response?: unknown
  errors?: unknown
}

export function firstFighterFromResponse(
  response: unknown,
): { photo?: string } | null {
  if (Array.isArray(response) && response.length > 0) {
    const first = response[0]
    return typeof first === "object" && first !== null
      ? (first as { photo?: string })
      : null
  }
  if (response && typeof response === "object") {
    return response as { photo?: string }
  }
  return null
}

type UpstreamQuery = { name?: string; search?: string; id?: number }

export function buildFightersUrl(params: UpstreamQuery): URL {
  const url = new URL(MMA_FIGHTERS_URL)
  if (params.name !== undefined) {
    url.searchParams.set("name", params.name)
  }
  if (params.search !== undefined) {
    url.searchParams.set("search", params.search)
  }
  if (params.id !== undefined) {
    url.searchParams.set("id", String(params.id))
  }
  return url
}

export async function fetchFightersUpstream(
  params: UpstreamQuery,
  apiKey: string,
): Promise<Response> {
  const url = buildFightersUrl(params)
  return fetch(url, {
    headers: { "x-apisports-key": apiKey },
  })
}

export async function fetchFightersByName(name: string, apiKey: string) {
  return fetchFightersUpstream({ name }, apiKey)
}

export async function fetchFightersBySearch(search: string, apiKey: string) {
  return fetchFightersUpstream({ search }, apiKey)
}

export async function fetchFighterByApiSportsId(
  apiSportsId: number,
  apiKey: string,
) {
  return fetchFightersUpstream({ id: apiSportsId }, apiKey)
}
