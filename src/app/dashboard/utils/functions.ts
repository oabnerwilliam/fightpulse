import { countriesList } from "./countries"

export type TabItem = {
  id: string
  label: string
}

export const dashboardTabs: TabItem[] = [
  {
    id: "EVENTS",
    label: "Eventos",
  },
  {
    id: "FIGHTERS",
    label: "Lutadores",
  },
]

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

export const fightMock = {
  data: [
    {
      id: 1,
      event: {
        id: 1,
        name: "UFC 327: Procházka vs. Ulberg",
        short_name: "UFC 327: Procházka vs. Ulberg",
        date: "2026-04-11T21:30:00.000Z",
        venue_name: "Kaseya Center",
        venue_city: "Miami",
        venue_state: "FL",
        venue_country: "USA",
        status: "scheduled",
        main_card_start_time: null,
        prelims_start_time: null,
        early_prelims_start_time: null,
        league: {
          id: 1,
          name: "UFC",
          abbreviation: "UFC",
        },
      },
      fighter1: {
        id: 9409,
        name: "Jiří Procházka",
        first_name: "Jiří",
        last_name: "Procházka",
        nickname: "BJP",
        date_of_birth: "1992-10-13T00:00:00.000Z",
        birth_place: null,
        nationality: "Czechia",
        height_inches: 75,
        reach_inches: 80,
        weight_lbs: 206,
        stance: "Orthodox",
        record_wins: 32,
        record_losses: 5,
        record_draws: 1,
        record_no_contests: 0,
        active: true,
        weight_class: {
          id: 1,
          name: "Heavyweight",
          abbreviation: "HW",
          weight_limit_lbs: 265,
          gender: "Male",
        },
      },
      fighter2: {
        id: 15109,
        name: "Carlos Ulberg",
        first_name: "Carlos",
        last_name: "Ulberg",
        nickname: "Black Jag",
        date_of_birth: "1990-11-06T00:00:00.000Z",
        birth_place: null,
        nationality: "New Zealand",
        height_inches: 76,
        reach_inches: 77,
        weight_lbs: 205,
        stance: "Orthodox",
        record_wins: 14,
        record_losses: 1,
        record_draws: 0,
        record_no_contests: 0,
        active: true,
        weight_class: {
          id: 1,
          name: "Heavyweight",
          abbreviation: "HW",
          weight_limit_lbs: 265,
          gender: "Male",
        },
      },
      winner: null,
      weight_class: {
        id: 1,
        name: "Heavyweight",
        abbreviation: "HW",
        weight_limit_lbs: 265,
        gender: "Male",
      },
      is_main_event: false,
      is_title_fight: true,
      card_segment: "main_card",
      fight_order: 2,
      scheduled_rounds: 5,
      result_method: null,
      result_method_detail: null,
      result_round: null,
      result_time: null,
      status: "scheduled",
    },
    {
      id: 28111,
      event: {
        id: 1,
        name: "UFC 327: Procházka vs. Ulberg",
        short_name: "UFC 327: Procházka vs. Ulberg",
        date: "2026-04-11T21:30:00.000Z",
        venue_name: "Kaseya Center",
        venue_city: "Miami",
        venue_state: "FL",
        venue_country: "USA",
        status: "scheduled",
        main_card_start_time: null,
        prelims_start_time: null,
        early_prelims_start_time: null,
        league: {
          id: 1,
          name: "UFC",
          abbreviation: "UFC",
        },
      },
      fighter1: {
        id: 5106,
        name: "Charles Oliveira",
        first_name: "Charles",
        last_name: "Oliveira",
        nickname: "Do Bronxs",
        date_of_birth: "1989-10-16T00:00:00.000Z",
        birth_place: null,
        nationality: "Brazil",
        height_inches: 70,
        reach_inches: 74,
        weight_lbs: 156,
        stance: "Orthodox",
        record_wins: 36,
        record_losses: 11,
        record_draws: 0,
        record_no_contests: 0,
        active: true,
        weight_class: {
          id: 5,
          name: "Lightweight",
          abbreviation: "LW",
          weight_limit_lbs: 155,
          gender: "Male",
        },
      },
      fighter2: {
        id: 6515,
        name: "Max Holloway",
        first_name: "Max",
        last_name: "Holloway",
        nickname: "Blessed",
        date_of_birth: "1991-12-03T00:00:00.000Z",
        birth_place: null,
        nationality: "USA",
        height_inches: 71,
        reach_inches: 69,
        weight_lbs: 155,
        stance: "Orthodox",
        record_wins: 27,
        record_losses: 8,
        record_draws: 0,
        record_no_contests: 0,
        active: true,
        weight_class: {
          id: 5,
          name: "Lightweight",
          abbreviation: "LW",
          weight_limit_lbs: 155,
          gender: "Male",
        },
      },
      winner: null,
      weight_class: {
        id: 5,
        name: "Lightweight",
        abbreviation: "LW",
        weight_limit_lbs: 155,
        gender: "Male",
      },
      is_main_event: true,
      is_title_fight: false,
      card_segment: "main_card",
      fight_order: 1,
      scheduled_rounds: 3,
      result_method: null,
      result_method_detail: null,
      result_round: null,
      result_time: null,
      status: "scheduled",
    },
  ],
  meta: {
    per_page: 25,
  },
}
