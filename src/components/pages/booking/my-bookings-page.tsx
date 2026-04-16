import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { isPast, parseISO } from "date-fns"
import { Ticket, Truck } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { getBookingsByEmail } from "@/lib/bookingStorage"
import { getHireBookingsByEmail } from "@/lib/hireBookingStorage"
import { data as mockData } from "@/data/mockData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingCard } from "./booking-card"
import { EmptyState } from "./booking-empty-state"

const isExpired = (dateStr: string): boolean => {
  try {
    const date = parseISO(dateStr)
    return isPast(date)
  } catch {
    return false
  }
}

const MyBookingsPage = () => {
  const { user, isInitialized } = useAuthStore()
  const navigate = useNavigate()

  // Redirect to sign-in if user is not authenticated
  useEffect(() => {
    if (isInitialized && !user) {
      navigate({ to: "/auth/sign-in", search: { redirect: "/my-bookings" } })
    }
  }, [isInitialized, user, navigate])

  if (!isInitialized || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  // Fetch bookings directly (localStorage is synchronous)
  const bookings = getBookingsByEmail(user.email)
  const hireBookings = getHireBookingsByEmail(user.email)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-black tracking-tight text-on-surface md:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-on-surface-variant">
          View and manage your trip bookings and fleet charters
        </p>
      </div>

      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="mb-6 w-full justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="trips"
            className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-on-primary"
          >
            <Ticket size={16} className="mr-2" />
            Trips
            {bookings.length > 0 && (
              <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                {bookings.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="charters"
            className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-on-primary"
          >
            <Truck size={16} className="mr-2" />
            Charters
            {hireBookings.length > 0 && (
              <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                {hireBookings.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trips" className="mt-0 space-y-4">
          {bookings.length === 0 ? (
            <EmptyState
              title="No trips yet"
              description="You haven't booked any bus trips yet. Book your first trip to get started."
              actionLabel="Book a Trip"
              onAction={() => navigate({ to: "/" })}
            />
          ) : (
            bookings.map((booking) => {
              const bus = mockData.buses.find((b) => b.id === booking.busId)
              const expired = isExpired(booking.departureDate)
              return (
                <BookingCard
                  key={booking.bookingRef}
                  type="trip"
                  bookingRef={booking.bookingRef}
                  route={bus ? `${bus.from} → ${bus.to}` : "Unknown Route"}
                  date={booking.departureDate}
                  departureTime={bus?.departureTime}
                  details={
                    bus ? `${booking.seatNumbers.length} seat(s)` : "N/A"
                  }
                  expired={expired}
                  onClick={() =>
                    navigate({
                      to: "/manage-booking",
                      search: { ref: booking.bookingRef },
                    })
                  }
                />
              )
            })
          )}
        </TabsContent>

        <TabsContent value="charters" className="mt-0 space-y-4">
          {hireBookings.length === 0 ? (
            <EmptyState
              title="No charters yet"
              description="You haven't hired any fleet yet. Charter a bus for your next trip."
              actionLabel="Charter a Fleet"
              onAction={() => navigate({ to: "/hire-fleet" })}
            />
          ) : (
            hireBookings.map((booking) => {
              const expired = booking.startDate && isExpired(booking.startDate)
              const vehicleCount = Object.values(
                booking.selectedVehicles
              ).reduce((a, b) => a + b, 0)
              return (
                <BookingCard
                  key={booking.bookingRef}
                  type="charter"
                  bookingRef={booking.bookingRef}
                  route={
                    booking.origin && booking.destination
                      ? `${booking.origin} → ${booking.destination}`
                      : "Unknown Route"
                  }
                  date={booking.startDate}
                  details={`${vehicleCount} vehicle(s) • ${booking.totalDays} day(s)`}
                  expired={!!expired}
                  onClick={() =>
                    navigate({
                      to: "/manage-booking",
                      search: { ref: booking.bookingRef },
                    })
                  }
                />
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyBookingsPage
