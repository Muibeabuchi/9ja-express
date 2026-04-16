import { format } from "date-fns"
import { Bus, Truck, Calendar, Clock, MapPin, ChevronRight } from "lucide-react"

export function BookingCard({
  type,
  bookingRef,
  route,
  date,
  departureTime,
  details,
  expired,
  onClick,
}: {
  type: "trip" | "charter"
  bookingRef: string
  route: string
  date?: string
  departureTime?: string
  details: string
  expired: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 text-left transition-all hover:border-primary/30 hover:shadow-md ${
        expired ? "opacity-60 grayscale" : ""
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          type === "trip"
            ? "bg-primary/10 text-primary"
            : "bg-secondary/10 text-secondary"
        }`}
      >
        {type === "trip" ? <Bus size={24} /> : <Truck size={24} />}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-sm font-bold tracking-wider text-primary">
            {bookingRef}
          </p>
          {expired && (
            <span className="bg-error/10 text-error rounded px-2 py-0.5 text-xs font-bold">
              Expired
            </span>
          )}
        </div>
        <p className="mt-1 truncate font-semibold text-on-surface">{route}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date ? format(new Date(date), "MMM dd, yyyy") : "Date TBD"}
          </span>
          {departureTime && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {departureTime}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {details}
          </span>
        </div>
      </div>
      <ChevronRight
        size={20}
        className="shrink-0 text-outline transition-transform group-hover:translate-x-1"
      />
    </button>
  )
}
