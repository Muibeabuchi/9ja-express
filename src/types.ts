type Page = "home" | "results" | "seats" | "checkout" | "confirmation"

type TripType = "one-way" | "round-trip" | "hire"

interface SearchParams {
  from: string
  to: string
  departureDate: string
  returnDate?: string
  tripType: TripType
}

interface BookingDetails {
  fullName: string
  email: string
  phone: string
  seatNumbers: number[]
}

export type { Page, TripType, SearchParams, BookingDetails }
