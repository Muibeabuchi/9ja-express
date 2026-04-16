// hireBookingStorage.ts
// All localStorage interactions for hire bookings are centralised here.

const STORAGE_KEY = "pmt_hire_bookings"

export interface StoredHireBooking {
  bookingRef: string // e.g. "CHT-A1B2C3D4"
  userId?: string
  selectedVehicles: Record<string, number>
  totals: {
    baseCost: number
    residenceSurcharge: number
    retainTotal: number
    driverAccomodationFee: number
    nights: number
    subtotal: number
  }
  totalDays: number
  origin: string
  destination: string
  originType?: string
  startDate?: string
  endDate?: string
  fullName: string
  email: string
  phone: number
  nextOfKinName?: string
  nextOfKinRelationship?: string
  nextOfKinPhone?: number
  specialRequests?: string
  bookedAt: string // ISO timestamp
}

/** Generates a unique hire booking reference in the format CHT-XXXXXXXX (12 chars total) */
export function generateHireBookingRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let suffix = ""
  for (let i = 0; i < 8; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `CHT-${suffix}`
}

/** Validates that a hire booking reference matches the expected format */
export function isValidHireBookingRef(ref: string): boolean {
  return /^CHT-[A-Z0-9]{8}$/.test(ref)
}

/** Returns all hire bookings stored in localStorage */
export function getAllHireBookings(): StoredHireBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredHireBooking[]
  } catch {
    return []
  }
}

/** Returns all hire bookings for a specific user by email */
export function getHireBookingsByEmail(email: string): StoredHireBooking[] {
  const all = getAllHireBookings()
  return all.filter((b) => b.email.toLowerCase() === email.toLowerCase())
}

/** Persists a new hire booking record to localStorage */
export function saveHireBooking(booking: StoredHireBooking): void {
  const existing = getAllHireBookings()
  existing.push(booking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

/** Looks up a hire booking by its reference (case-insensitive) */
export function getHireBookingByRef(ref: string): StoredHireBooking | null {
  const upper = ref.toUpperCase()
  return getAllHireBookings().find((b) => b.bookingRef === upper) ?? null
}
