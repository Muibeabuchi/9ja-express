// types.ts

export type Location =
  | "Lagos (Jibowu)"
  | "Lagos (Ajah)"
  | "Abuja (Utako)"
  | "Abuja (Gwagwalada)"
  | "Enugu (Okpara Ave)"
  | "Owerri (Main)"
  | "Port Harcourt (ABA Road)"
  | "Onitsha (Main)"
  | "Aba (P.H Road)"
  | "Uyo (Itam)"
  | "Calabar (Main)"
  | "Benin City (Central)"
  | "Warri (Effurun)"
  | "Ibadan (Iwo Road)"
  | "Kano (Central)"
  | "Jos (Main)"
  | "Kaduna (Mando)"
  | "Akure (Main)"

export type BusType = "Executive Coach" | "Smart Coach" | "Blazer"

export type Bus = {
  id: string
  name: string
  type: BusType
  totalSeats: number
  price: number
  departureTime: string
  arrivalTime: string
  from: Location
  to: Location
  availableSeats: number[]
  rating: number
  duration: string
}

export type BookingStatus = "confirmed" | "pending" | "cancelled"

export type PaymentMethod = "Paystack" | "Flutterwave"

export type Booking = {
  ref: string
  phone: string
  status: BookingStatus
  busId: string
  seat: string
  passengerName: string
  date: string
  amount: number
  paymentMethod: PaymentMethod
}

export type CharterVehicle = {
  id: string
  model: string
  type: string
  capacity: number
  baseRatePerDay: number
  amenities: string[]
  imageURL: string
  availableQuantity: number
}

export type GlobalSurcharges = {
  residencePickupFee: number
  driverAccommodationPerNight: number
  retainBusDailyFee: number
}

export type AppData = {
  locations: Location[]
  buses: Bus[]
  bookings: Booking[]
  charterFleet?: CharterVehicle[]
  globalSurcharges?: GlobalSurcharges
}