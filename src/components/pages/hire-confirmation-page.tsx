import { Route } from "@/routes/hire-confirmation"
import { data as mockData } from "@/data/mockData"
import { useNavigate } from "@tanstack/react-router"
import {
  CheckCircle,
  Check,
  Bus,
  Info,
  Download,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import { format } from "date-fns"
// import { Button } from "../ui/button"

export const HireConfirmationPage = () => {
  const {
    bookingRef,
    fullName,
    vehicles,
    totals,
    totalDays,
    start,
    end,
    origin,
    destination,
  } = Route.useSearch()
  const navigate = useNavigate()
  const parsedVehicles = vehicles ? JSON.parse(vehicles) : {}
  const parsedTotals = totals ? JSON.parse(totals) : {}
  const handleNavigate = () => {
    navigate({ to: "/" })
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_40px_80px_-15px_rgba(0,0,0,0.04)]">
        {/* Success Header */}
        <div className="flex flex-col items-center p-10 text-center">
          <div className="relative mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="text-4xl" size={40} />
            </div>
          </div>
          <h1 className="mb-3 font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
            Charter Requested & Confirmed!
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-on-surface-variant">
            Thank you{" "}
            <span className="font-semibold text-on-surface">
              {fullName || "Lead Passenger"}
            </span>
            , your payment was successful.
          </p>
        </div>
        {/* Booking Reference Banner */}
        <div className="mx-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-surface-container-low px-10 py-6 md:flex-row">
          <div className="flex flex-col">
            <span className="font-label text-xs font-bold tracking-[0.1em] text-outline uppercase">
              Charter Booking Reference
            </span>
            <span className="font-headline text-xl font-extrabold tracking-wide text-primary">
              {bookingRef || "CHT-XXXXXXXX"}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-2">
            <ShieldCheck className="text-primary" size={16} />
            <span className="text-sm font-medium text-on-surface-variant">
              Transaction Secured
            </span>
          </div>
        </div>
        {/* Vertical Timeline Section */}
        <section className="p-10">
          <h3 className="mb-8 font-label text-sm font-bold tracking-[0.05em] text-outline uppercase">
            What Happens Now?
          </h3>
          <div className="relative space-y-0">
            {/* Vertical Line */}
            <div className="bg-surface-variant absolute top-2 bottom-2 left-2.75 w-0.5"></div>
            {/* Step 1 */}
            <div className="relative flex items-start gap-4 pb-8 pl-10">
              <div className="absolute left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                <Check className="text-xs text-on-primary" size={14} />
              </div>
              <div>
                <p className="leading-tight font-bold text-on-surface">
                  Payment Verified
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Route: {origin} to {destination} confirmed.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative flex items-start gap-4 pb-8 pl-10">
              <div className="absolute left-0 z-10 flex h-6 w-6 animate-pulse items-center justify-center rounded-full border-2 border-primary bg-surface-container-lowest">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="leading-tight font-bold text-primary">
                  Logistics Manager is assigned
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  A dedicated agent will start route planning within 2 hours.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative flex items-start gap-4 pb-8 pl-10">
              <div className="bg-surface-variant absolute left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full"></div>
              <div>
                <p className="leading-tight font-bold text-outline">
                  Final call scheduled
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Coordination for residence pickup at your convenience.
                </p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative flex items-start gap-4 pl-10">
              <div className="bg-surface-variant absolute left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full"></div>
              <div>
                <p className="leading-tight font-bold text-outline">
                  Driver details provided
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Full fleet credentials sent 24hrs before departure.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Collapsed Summary Card */}
        <section className="mb-10 px-10">
          <div className="flex flex-col gap-4 rounded-lg bg-surface-container-low/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-surface-container-lowest p-2">
                  <Bus className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-label text-xs font-bold text-outline uppercase">
                    Hired Fleet
                  </p>
                  <p className="font-bold text-on-surface">
                    {Object.entries(parsedVehicles)
                      .map(([id, count]) => {
                        const vehicle = mockData.charterFleet?.find(
                          (v) => v.id === id
                        )
                        return vehicle
                          ? `${count}x ${vehicle.model.split(" ")[0]}`
                          : `${count}x Vehicle`
                      })
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-label text-xs font-bold text-outline uppercase">
                  Total Paid
                </p>
                <p className="font-headline text-xl font-extrabold text-on-surface">
                  ₦{parsedTotals.subtotal?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-4">
              <div className="flex-1">
                <p className="font-label text-xs font-bold text-outline uppercase">
                  Service Window
                </p>
                <p className="text-sm font-medium text-on-surface">
                  {start && end
                    ? `${format(new Date(start), "MMM dd")} — ${format(new Date(end), "MMM dd, yyyy")}`
                    : `${totalDays || 1} Days Trip`}
                </p>
              </div>
              <Info className="text-outline-variant" size={20} />
            </div>
          </div>
        </section>
        {/* Action Buttons */}
        <footer className="grid grid-cols-1 gap-4 p-10 pt-0 md:grid-cols-2">
          <button
            onClick={handleNavigate}
            className="order-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold tracking-tight text-surface transition-opacity hover:opacity-90 md:order-2"
            // className="flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-bold tracking-tight text-surface transition-opacity hover:opacity-90 md:order-2"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </button>
          <button className="order-2 flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-8 py-4 font-bold tracking-tight text-primary transition-colors hover:bg-primary/5 md:order-1">
            <Download size={20} />
            Download Payment Receipt (PDF)
          </button>
        </footer>
      </div>
    </div>
  )
}
