type Page = "home" | "results" | "seats" | "checkout" | "confirmation"

type TripType = "one-way" | "round-trip" | "hire"

interface SearchParams {
  from: string
  to: string
  departureDate: string
  returnDate?: string
  tripType: TripType
  originType?: "terminal" | "residence"
  purpose?: string
}

interface BookingDetails {
  fullName: string
  email: string
  phone: string
  seatNumbers: number[]
  nextOfKinName?: string
  nextOfKinPhone?: string
}

export type { Page, TripType, SearchParams, BookingDetails }
