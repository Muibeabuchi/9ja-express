import { z } from "zod"

export const LocationEnum = z.enum([
  "Lagos (Jibowu)",
  "Lagos (Ajah)",
  "Abuja (Utako)",
  "Abuja (Gwagwalada)",
  "Enugu (Okpara Ave)",
  "Owerri (Main)",
  "Port Harcourt (ABA Road)",
  "Onitsha (Main)",
  "Aba (P.H Road)",
  "Uyo (Itam)",
  "Calabar (Main)",
  "Benin City (Central)",
  "Warri (Effurun)",
  "Ibadan (Iwo Road)",
  "Kano (Central)",
  "Jos (Main)",
  "Kaduna (Mando)",
  "Akure (Main)",
])

export type Location = z.infer<typeof LocationEnum>

export const BusTypeEnum = z.enum(["Executive Coach", "Smart Coach", "Blazer"])

export type BusType = z.infer<typeof BusTypeEnum>

export const BusSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: BusTypeEnum,
  totalSeats: z.number(),
  price: z.number(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  from: LocationEnum,
  to: LocationEnum,
  availableSeats: z.array(z.number()),
  rating: z.number(),
  duration: z.string(),
})

export type Bus = z.infer<typeof BusSchema>

export const BookingStatusEnum = z.enum(["confirmed", "pending", "cancelled"])

export const PaymentMethodEnum = z.enum(["Paystack", "Flutterwave"])

export const BookingSchema = z.object({
  ref: z.string(),
  phone: z.string(),
  status: BookingStatusEnum,
  busId: z.string(),
  seat: z.string(),
  passengerName: z.string(),
  date: z.string(),
  amount: z.number(),
  paymentMethod: PaymentMethodEnum,
})

export type Booking = z.infer<typeof BookingSchema>

export const CharterVehicleSchema = z.object({
  id: z.string(),
  model: z.string(),
  type: z.string(),
  capacity: z.number(),
  baseRatePerDay: z.number(),
  amenities: z.array(z.string()),
  imageURL: z.string(),
  availableQuantity: z.number(),
})

export type CharterVehicle = z.infer<typeof CharterVehicleSchema>

export const GlobalSurchargesSchema = z.object({
  residencePickupFee: z.number(),
  driverAccommodationPerNight: z.number(),
  retainBusDailyFee: z.number(),
})

export type GlobalSurcharges = z.infer<typeof GlobalSurchargesSchema>

export const AppDataSchema = z.object({
  locations: z.array(LocationEnum),
  buses: z.array(BusSchema),
  bookings: z.array(BookingSchema),
  charterFleet: z.array(CharterVehicleSchema).optional(),
  globalSurcharges: GlobalSurchargesSchema.optional(),
})

export type AppData = z.infer<typeof AppDataSchema>
