import { Route } from "@/routes/manage-booking"
import { data as mockData } from "@/data/mockData"
import { getHireBookingByRef } from "@/lib/hireBookingStorage"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import {
  // Bus,
  Calendar,
  Download,
  SearchX,
  MapPin,
  XCircle,
  ChevronRight,
  Truck,
} from "lucide-react"

const randomizer = () => Math.floor(Math.random() * 6)

const HireManageBookingPage = () => {
  const { ref } = Route.useSearch()
  const navigate = useNavigate()

  const booking = getHireBookingByRef(ref)

  // Empty State
  if (!booking) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="relative mb-8">
          <div className="bg-error/20 absolute inset-0 animate-ping rounded-full" />
          <div className="bg-error/10 text-error relative flex h-24 w-24 items-center justify-center rounded-full">
            <SearchX size={48} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="mb-4 font-headline text-3xl font-black text-on-surface">
          Booking Not Found
        </h1>
        <p className="mb-10 text-base leading-relaxed text-on-surface-variant">
          We couldn't locate any hire booking matching the reference{" "}
          <strong className="font-mono text-on-surface">{ref || "N/A"}</strong>.
          Please double-check the reference number or book a new charter.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="group flex w-full max-w-[280px] items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-bold tracking-widest text-on-primary uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Book a Charter
          <ChevronRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
        {/* Left Column: Booking Management Actions */}
        <div className="flex-1 space-y-8 lg:sticky lg:top-32">
          <div>
            <div className="border-success/30 bg-success/10 text-success mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-success relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              Active Hire Booking
            </div>
            <h1 className="mb-4 font-headline text-4xl font-black text-on-surface md:text-5xl">
              Manage Charter
            </h1>
            <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
              View your charter details, download receipt, or make changes to
              your upcoming fleet hire.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:gap-4">
            <button className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 transition-colors hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]">
              <Download size={24} className="text-primary" />
              <span className="text-sm font-bold">Download Receipt</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 transition-colors hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]">
              <Calendar size={24} className="text-primary" />
              <span className="text-sm font-bold">Reschedule</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 transition-colors hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]">
              <MapPin size={24} className="text-primary" />
              <span className="text-sm font-bold">Track Fleet Location</span>
            </button>
            <button className="border-error/30 bg-error/5 hover:border-error hover:bg-error/10 flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 transition-colors active:scale-[0.98]">
              <XCircle size={24} className="text-error" />
              <span className="text-error text-sm font-bold">
                Cancel Charter
              </span>
            </button>
          </div>

          <div className="rounded-2xl bg-surface-container-low p-6">
            <h3 className="mb-4 font-bold">Booking Details</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex justify-between">
                <span>Booked On</span>
                <span className="font-bold text-on-surface">
                  {booking.bookedAt
                    ? format(
                        new Date(booking.bookedAt),
                        "MMM dd, yyyy • hh:mm a"
                      )
                    : "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Payment Status</span>
                <span className="text-success font-bold text-on-surface">
                  Paid
                </span>
              </li>
              <li className="flex justify-between">
                <span>Amount</span>
                <span className="font-bold text-on-surface">
                  ₦{booking.totals.subtotal.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Duration</span>
                <span className="font-bold text-on-surface">
                  {booking.totalDays} {booking.totalDays === 1 ? "Day" : "Days"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: The Charter Ticket */}
        <div className="relative mx-auto w-full max-w-[420px] flex-1 lg:mx-0">
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-[80px]"></div>

          <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] bg-surface-container-lowest shadow-2xl ring-1 shadow-primary/10 ring-outline-variant/10">
            {/* Ticket Header Segment */}
            <div className="signature-gradient relative px-8 py-8 text-white md:px-10 md:py-10">
              <div className="mb-8 flex items-start justify-between opacity-90">
                <div>
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Charter Operator
                  </p>
                  <p className="font-headline font-bold">EaseUp Fleet</p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Booking Ref
                  </p>
                  <p className="font-mono text-sm tracking-wider">
                    {booking.bookingRef}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="font-headline text-4xl font-black tracking-tight drop-shadow-sm md:text-5xl">
                    {booking.origin?.substring(0, 3).toUpperCase() || "ORG"}
                  </h2>
                  <p className="mt-1 text-xs font-medium tracking-widest uppercase opacity-80 md:text-sm">
                    {booking.origin || "Origin"}
                  </p>
                </div>

                <div className="relative flex w-16 justify-center">
                  <div className="absolute top-1/2 w-full border-t-[3px] border-dashed border-white/40"></div>
                  <div className="relative bg-[#004AC6] px-2 text-white">
                    <Truck size={24} />
                  </div>
                </div>

                <div className="flex-1 text-right">
                  <h2 className="font-headline text-4xl font-black tracking-tight drop-shadow-sm md:text-5xl">
                    {booking.destination?.substring(0, 3).toUpperCase() ||
                      "DST"}
                  </h2>
                  <p className="mt-1 text-xs font-medium tracking-widest uppercase opacity-80 md:text-sm">
                    {booking.destination || "Destination"}
                  </p>
                </div>
              </div>
            </div>

            {/* Cutout Separator Effect */}
            <div className="relative flex items-center justify-between bg-surface-container-lowest">
              <div className="-ml-4 h-8 w-8 rounded-full bg-surface-container-low shadow-inner"></div>
              <div className="h-[2px] grow border-t-2 border-dashed border-outline-variant/30"></div>
              <div className="-mr-4 h-8 w-8 rounded-full bg-surface-container-low shadow-inner"></div>
            </div>

            {/* Ticket Details Segment */}
            <div className="space-y-8 px-8 py-8 md:px-10 md:py-10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Charter Lead
                  </p>
                  <p className="truncate font-semibold text-on-surface md:text-lg">
                    {booking.fullName || "Guest User"}
                  </p>
                  <p className="mt-1 truncate text-xs text-on-surface-variant">
                    {booking.phone || "No phone provided"}
                  </p>
                </div>

                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Fleet Allocation
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(booking.selectedVehicles).map(
                      ([id, count]) => {
                        const vehicle = mockData.charterFleet?.find(
                          (v) => v.id === id
                        )
                        return (
                          <span
                            key={id}
                            className="rounded bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary md:text-base"
                          >
                            {count}x {vehicle?.model.split(" ")[0] || "Bus"}
                          </span>
                        )
                      }
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium text-on-surface-variant">
                    Charter Service
                  </p>
                </div>

                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Start Date
                  </p>
                  <p className="font-semibold text-on-surface md:text-lg">
                    {booking.startDate
                      ? format(new Date(booking.startDate), "MMM dd, yyyy")
                      : "Date TBD"}
                  </p>
                </div>

                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Duration
                  </p>
                  <p className="text-error font-semibold md:text-lg">
                    {booking.totalDays}{" "}
                    {booking.totalDays === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Barcode Segment */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-8 py-8 pt-0 outline-none">
              <div className="mb-4 flex h-16 w-full items-center justify-center gap-[2px] overflow-hidden opacity-80 md:h-20">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-on-surface"
                    style={{ width: `${[1, 2, 3, 4, 1, 2][randomizer()]}px` }}
                  />
                ))}
              </div>
              <p className="font-mono text-xs tracking-[0.3em] text-on-surface-variant">
                {booking.bookingRef}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HireManageBookingPage
