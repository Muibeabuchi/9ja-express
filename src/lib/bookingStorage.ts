// bookingStorage.ts
// All localStorage interactions for bookings are centralised here.

const STORAGE_KEY = "pmt_bookings"

export interface StoredBooking {
  bookingRef: string // e.g. "PMT-A1B2C3D4"
  busId: string
  seatNumbers: number[]
  fullName: string
  email: string
  phone: string
  departureDate: string // "yyyy-MM-dd"
  bookedAt: string // ISO timestamp
}

/** Generates a unique booking reference in the format PMT-XXXXXXXX (12 chars total) */
export function generateBookingRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let suffix = ""
  for (let i = 0; i < 8; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `PMT-${suffix}`
}

/** Validates that a booking reference matches the expected format */
export function isValidBookingRef(ref: string): boolean {
  return /^PMT-[A-Z0-9]{8}$/.test(ref)
}

/** Returns all bookings stored in localStorage */
export function getAllBookings(): StoredBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredBooking[]
  } catch {
    return []
  }
}

/** Persists a new booking record to localStorage */
export function saveBooking(booking: StoredBooking): void {
  const existing = getAllBookings()
  existing.push(booking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

/** Looks up a booking by its reference (case-insensitive) */
export function getBookingByRef(ref: string): StoredBooking | null {
  const upper = ref.toUpperCase()
  return getAllBookings().find((b) => b.bookingRef === upper) ?? null
}
