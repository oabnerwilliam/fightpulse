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
  const country = countriesList.find((country) => country.name === countryName)
  return country?.["alpha-2"]
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
      is_main_event: true,
      is_title_fight: true,
      card_segment: "main_card",
      fight_order: 1,
      scheduled_rounds: 5,
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
