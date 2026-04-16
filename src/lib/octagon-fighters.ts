export const OCTAGON_BASE = "https://api.octagon-api.com"
export const OCTAGON_FIGHTERS_URL = `${OCTAGON_BASE}/fighters`

export type OctagonFighter = {
  category: string
  draws: string
  imgUrl: string
  losses: string
  name: string
  nickname: string
  wins: string
  status: string
  placeOfBirth?: string
  trainsAt?: string
  fightingStyle?: string
  age: string
  height: string
  weight: string
  octagonDebut: string
  reach: string
  legReach?: string
}

/** Full roster: keys are Octagon slugs (e.g. `islam-makhachev`). */
export type OctagonFightersMap = Record<string, OctagonFighter>

const FIGHTERS_REVALIDATE_SEC = 3600

export async function fetchAllFightersJson(): Promise<OctagonFightersMap> {
  const res = await fetch(OCTAGON_FIGHTERS_URL, {
    next: { revalidate: FIGHTERS_REVALIDATE_SEC },
  })
  if (!res.ok) {
    throw new Error(`Octagon GET /fighters failed: ${res.status}`)
  }
  const data: unknown = await res.json()
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Octagon GET /fighters: expected object")
  }
  return data as OctagonFightersMap
}

function octagonFighterUrl(slug: string): string {
  return `${OCTAGON_BASE}/fighter/${encodeURIComponent(slug)}`
}

export async function fetchFighterBySlug(
  slug: string,
): Promise<OctagonFighter | null> {
  const trimmed = slug.trim()
  if (!trimmed) return null
  const res = await fetch(octagonFighterUrl(trimmed), {
    next: { revalidate: FIGHTERS_REVALIDATE_SEC },
  })
  if (!res.ok) return null
  const data: unknown = await res.json()
  if (!data || typeof data !== "object" || Array.isArray(data)) return null
  return data as OctagonFighter
}

function normalizeName(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ")
}

function scoreNameMatch(fighterName: string, query: string): number {
  const n = normalizeName(fighterName)
  const q = normalizeName(query)
  if (!q) return 0
  if (n === q) return 100
  if (n.startsWith(q)) return 80
  if (n.includes(q)) return 60
  const parts = n.split(" ")
  if (parts.some((p) => p.startsWith(q) && q.length >= 2)) return 40
  return 0
}

/** Best single match for a display name (e.g. photo lookup). */
export function findBestFighterByName(
  map: OctagonFightersMap,
  name: string,
): { slug: string; fighter: OctagonFighter } | null {
  let best: { slug: string; fighter: OctagonFighter; score: number } | null =
    null
  for (const [slug, fighter] of Object.entries(map)) {
    const score = scoreNameMatch(fighter.name, name)
    if (score === 0) continue
    if (
      !best ||
      score > best.score ||
      (score === best.score && slug.localeCompare(best.slug) < 0)
    ) {
      best = { slug, fighter, score }
    }
  }
  if (!best) return null
  return { slug: best.slug, fighter: best.fighter }
}

/** Search box: all roster entries whose name matches the query, best first. */
export function filterFightersBySearch(
  map: OctagonFightersMap,
  search: string,
): Array<{ slug: string; fighter: OctagonFighter }> {
  const q = normalizeName(search)
  if (!q) return []

  const scored: Array<{
    slug: string
    fighter: OctagonFighter
    score: number
  }> = []

  for (const [slug, fighter] of Object.entries(map)) {
    const score = scoreNameMatch(fighter.name, search)
    if (score > 0) scored.push({ slug, fighter, score })
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.fighter.name.localeCompare(b.fighter.name)
  })

  return scored.map(({ slug, fighter }) => ({ slug, fighter }))
}

export function photoFromOctagonFighter(
  fighter: OctagonFighter,
): string | null {
  const url = fighter.imgUrl
  return typeof url === "string" && url.length > 0 ? url : null
}
