import { countriesList } from "./countries"

export type TabItem = {
  id: string
  label: string
}

export const getCountryCode = (countryName: string) => {
  const normalizedCountryName =
    countryName === "USA" ? "United States of America" : countryName
  const country = countriesList.find(
    (country) => country.name === normalizedCountryName,
  )
  return country?.["alpha-2"]
}

/** Separa o título completo no primeiro ":" (ex.: nome do card vs. luta principal). */
export type ParsedEventTitle = {
  eventName: string
  mainEvent: string
}

export function parseEventTitle(fullName: string): ParsedEventTitle {
  const idx = fullName.indexOf(":")
  if (idx === -1) {
    return { eventName: fullName.trim(), mainEvent: "" }
  }
  return {
    eventName: fullName.slice(0, idx).trim(),
    mainEvent: fullName.slice(idx + 1).trim(),
  }
}

export function normalizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/ß/g, "ss")
    .replace(/Œ/g, "OE")
    .replace(/œ/g, "oe")
    .replace(/Æ/g, "AE")
    .replace(/æ/g, "ae")
    .trim()
}

export function removeFirstName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  return parts.slice(1).join(" ").trim()
}
