import {
  Armchair,
  Bus as BusIcon,
  Zap,
  DoorOpen,
  ArrowRight,
  Info,
} from "lucide-react"
import { Route } from "@/routes/seats"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { data as mockData } from "@/data/mockData"
import Seat from "../seat"
import type { Bus } from "@/data/types"

const ExecutiveCoachGrid = ({
  // num,
  bus,
  selectedSeats,
  onSelectSeat,
}: {
  // num:number;
  bus: Bus
  selectedSeats: number[]
  onSelectSeat: (n: number) => void
}) => {
  const regularSeats = bus.totalSeats - 3
  const rows = Math.ceil(regularSeats / 4)

  return (
    <>
      <div className="grid grid-cols-5 gap-y-4 md:gap-y-6">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="contents">
            <div className="flex justify-center">
              {rowIndex * 4 + 1 <= regularSeats && (
                <Seat
                  // num={rowIndex * 4 + 1}
                  isSelected={selectedSeats.includes(rowIndex * 4 + 1)}
                  isAvailable={bus.availableSeats.includes(rowIndex * 4 + 1)}
                  onClick={() => onSelectSeat(rowIndex * 4 + 1)}
                />
              )}
            </div>
            <div className="flex justify-center">
              {rowIndex * 4 + 2 <= regularSeats && (
                <Seat
                  // num={rowIndex * 4 + 2}
                  isSelected={selectedSeats.includes(rowIndex * 4 + 2)}
                  isAvailable={bus.availableSeats.includes(rowIndex * 4 + 2)}
                  onClick={() => onSelectSeat(rowIndex * 4 + 2)}
                />
              )}
            </div>
            <div className="flex items-center justify-center">
              <div className="h-full w-px bg-surface-container" />
            </div>
            <div className="flex justify-center">
              {rowIndex * 4 + 3 <= regularSeats && (
                <Seat
                  // num={rowIndex * 4 + 3}
                  isSelected={selectedSeats.includes(rowIndex * 4 + 3)}
                  isAvailable={bus.availableSeats.includes(rowIndex * 4 + 3)}
                  onClick={() => onSelectSeat(rowIndex * 4 + 3)}
                />
              )}
            </div>
            <div className="flex justify-center">
              {rowIndex * 4 + 4 <= regularSeats && (
                <Seat
                  // num={rowIndex * 4 + 4}
                  isSelected={selectedSeats.includes(rowIndex * 4 + 4)}
                  isAvailable={bus.availableSeats.includes(rowIndex * 4 + 4)}
                  onClick={() => onSelectSeat(rowIndex * 4 + 4)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Back Bench */}
      <div className="mt-4 flex w-full justify-between gap-2 md:mt-6 md:gap-6">
        {[regularSeats + 1, regularSeats + 2, regularSeats + 3].map(
          (seatNum) => (
            <div key={seatNum} className="flex flex-1 justify-center">
              {seatNum <= bus.totalSeats && (
                <Seat
                  // num={seatNum}
                  isSelected={selectedSeats.includes(seatNum)}
                  isAvailable={bus.availableSeats.includes(seatNum)}
                  onClick={() => onSelectSeat(seatNum)}
                  className="w-full max-w-[120px]"
                />
              )}
            </div>
          )
        )}
      </div>
    </>
  )
}

const SmartCoachGrid = ({
  bus,
  selectedSeats,
  onSelectSeat,
}: {
  bus: Bus
  selectedSeats: number[]
  onSelectSeat: (n: number) => void
}) => {
  const rows = Math.ceil(bus.totalSeats / 3)

  return (
    <div className="grid grid-cols-4 gap-y-4 md:gap-y-6">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="contents">
          <div className="flex justify-center">
            {rowIndex * 3 + 1 <= bus.totalSeats && (
              <Seat
                // num={rowIndex * 3 + 1}
                isSelected={selectedSeats.includes(rowIndex * 3 + 1)}
                isAvailable={bus.availableSeats.includes(rowIndex * 3 + 1)}
                onClick={() => onSelectSeat(rowIndex * 3 + 1)}
              />
            )}
          </div>
          <div className="flex justify-center">
            {rowIndex * 3 + 2 <= bus.totalSeats && (
              <Seat
                // num={rowIndex * 3 + 2}
                isSelected={selectedSeats.includes(rowIndex * 3 + 2)}
                isAvailable={bus.availableSeats.includes(rowIndex * 3 + 2)}
                onClick={() => onSelectSeat(rowIndex * 3 + 2)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="h-full w-px bg-surface-container" />
          </div>
          <div className="flex justify-center">
            {rowIndex * 3 + 3 <= bus.totalSeats && (
              <Seat
                // num={rowIndex * 3 + 3}
                isSelected={selectedSeats.includes(rowIndex * 3 + 3)}
                isAvailable={bus.availableSeats.includes(rowIndex * 3 + 3)}
                onClick={() => onSelectSeat(rowIndex * 3 + 3)}
                className="w-16 md:w-20"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const BlazerGrid = ({
  bus,
  selectedSeats,
  onSelectSeat,
}: {
  bus: Bus
  selectedSeats: number[]
  onSelectSeat: (n: number) => void
}) => {
  const regularSeats = bus.totalSeats - 1
  const rows = Math.ceil(regularSeats / 3)

  return (
    <div className="mx-auto max-w-sm rounded-4xl border-4 border-surface-container bg-surface-container-lowest p-4 pb-8 md:p-6 md:pb-10">
      {/* Front */}
      <div className="mb-8 flex justify-between px-4 opacity-50">
        <div className="flex flex-col items-center">
          <Zap size={24} className="rotate-12" />
          <span className="mt-1 text-[8px] font-bold uppercase">Driver</span>
        </div>
        <div className="flex flex-col items-center">
          <Seat
            // num={0}
            isSelected={false}
            isAvailable={false}
            onClick={() => {}}
            className="h-12 w-12 border-none bg-surface-container-highest shadow-none"
          />
        </div>
      </div>
      <div className="mb-6 h-px w-full bg-surface-container" />

      {/* Grid */}
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-6">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="contents">
            {[1, 2, 3].map((colIndex) => {
              const seatNum = rowIndex * 3 + colIndex
              if (seatNum > regularSeats) return <div key={colIndex} />
              return (
                <div key={colIndex} className="flex justify-center">
                  <Seat
                    // num={seatNum}
                    isSelected={selectedSeats.includes(seatNum)}
                    isAvailable={bus.availableSeats.includes(seatNum)}
                    onClick={() => onSelectSeat(seatNum)}
                    className="h-12 w-12"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {/* Back seat */}
      <div className="mt-4 flex justify-center md:mt-6">
        <Seat
          // num={bus.totalSeats}
          isSelected={selectedSeats.includes(bus.totalSeats)}
          isAvailable={bus.availableSeats.includes(bus.totalSeats)}
          onClick={() => onSelectSeat(bus.totalSeats)}
          className="h-12 w-12"
        />
      </div>
    </div>
  )
}

const SeatSelectionPage = () => {
  const { busId, departureDate } = Route.useSearch()
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  const bus = mockData.buses.find((b) => b.id === busId)

  if (!bus) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 px-4 text-center">
        <Info className="mb-4 text-outline" size={48} />
        <h2 className="font-headline text-2xl font-bold">Bus not found</h2>
        <p className="mt-2 text-on-surface-variant">
          The bus you are looking for does not exist or the selection has
          expired.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-on-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Return to Home
        </button>
      </div>
    )
  }

  const handleSeatClick = (seatNum: number) => {
    if (bus.availableSeats.includes(seatNum)) {
      if (selectedSeats.includes(seatNum)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seatNum))
      } else {
        setSelectedSeats([...selectedSeats, seatNum])
      }
    }
  }

  const handleConfirm = () => {
    navigate({
      to: "/checkout",
      search: {
        busId,
        seatNumbers: selectedSeats,
        departureDate,
      },
    })
  }

  const totalPrice = (bus.price + 3500) * selectedSeats.length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="grid grid-cols-12 items-start gap-6 md:gap-12">
        {/* Left: Info */}
        <div className="order-2 col-span-12 space-y-8 md:space-y-12 lg:order-1 lg:col-span-3">
          <section>
            <h1 className="mb-4 font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
              Select Your Seats
            </h1>
            <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
              Choose your preferred seats for the journey from{" "}
              <span className="font-semibold text-primary">{bus.from}</span> to{" "}
              <span className="font-semibold text-primary">{bus.to}</span>.
            </p>
          </section>

          <div className="space-y-6 rounded-xl bg-surface-container-low p-6 md:p-8">
            <h3 className="font-headline text-lg font-bold">Legend</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
                  <Armchair size={20} className="text-outline" />
                </div>
                <span className="text-sm font-medium">Available</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="signature-gradient flex h-10 w-10 items-center justify-center rounded-lg">
                  <Armchair
                    size={20}
                    className="text-white"
                    fill="currentColor"
                  />
                </div>
                <span className="text-sm font-medium">Selected</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-highest">
                  <Armchair size={20} className="text-outline/40" />
                </div>
                <span className="text-sm font-medium">Occupied</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-primary/5 p-6 md:p-8">
            <span className="mb-3 block text-[10px] font-bold tracking-widest text-primary uppercase">
              Trip Details
            </span>
            <div className="mb-2 flex items-center gap-3">
              <BusIcon size={18} className="text-primary" />
              <span className="font-headline font-bold">{bus.name}</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Departure: {bus.departureTime} • {bus.type} ({bus.totalSeats}{" "}
              seats)
            </p>
          </div>
        </div>

        {/* Middle: Bus Layout */}
        <div className="order-1 col-span-12 rounded-3xl bg-surface-container-low p-2 md:rounded-4xl lg:order-2 lg:col-span-6">
          <div
            className={`ambient-shadow rounded-[1.3rem] border border-outline-variant/10 ${bus.type === "Blazer" ? "bg-transparent py-6 md:py-12" : "bg-surface-container-lowest p-6 md:rounded-[1.8rem] md:p-12"}`}
          >
            {/* Front Area (For Coaches) */}
            {bus.type !== "Blazer" && (
              <div className="mb-10 flex flex-col items-center md:mb-16">
                <div className="mb-8 h-1.5 w-16 rounded-full bg-surface-container md:mb-10 md:w-20" />
                <div className="flex w-full justify-between px-4 md:px-12">
                  <div className="flex flex-col items-center opacity-30">
                    <Zap size={28} className="rotate-12 md:h-8 md:w-8" />
                    <span className="mt-2 text-[8px] font-bold tracking-tighter uppercase md:text-[10px]">
                      Pilot
                    </span>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container-low md:h-20 md:w-20">
                    <DoorOpen
                      size={20}
                      className="text-outline md:h-6 md:w-6"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Render Grids */}
            {bus.type === "Executive Coach" && (
              <ExecutiveCoachGrid
                bus={bus}
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatClick}
              />
            )}
            {bus.type === "Smart Coach" && (
              <SmartCoachGrid
                bus={bus}
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatClick}
              />
            )}
            {bus.type === "Blazer" && (
              <BlazerGrid
                bus={bus}
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatClick}
              />
            )}

            {/* Back Area (For Coaches) */}
            {bus.type !== "Blazer" && (
              <div className="mt-12 flex justify-center md:mt-20">
                <div className="h-4 w-2/3 rounded-full bg-surface-container-low opacity-40" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="order-3 col-span-12 lg:col-span-3">
          <div className="ambient-shadow sticky top-28 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 md:p-8">
            <h3 className="mb-6 font-headline text-xl font-bold md:mb-8">
              Booking Summary
            </h3>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start justify-between">
                <div className="grow">
                  <span className="text-[10px] font-bold tracking-widest text-outline uppercase">
                    Seats Selected
                  </span>
                  {selectedSeats.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedSeats
                        .sort((a, b) => a - b)
                        .map((seat) => (
                          <div
                            key={seat}
                            className="rounded-md bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary"
                          >
                            {seat}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-outline italic">
                      No seats selected
                    </p>
                  )}
                </div>
                {selectedSeats.length > 0 && (
                  <button
                    onClick={() => setSelectedSeats([])}
                    className="text-error shrink-0 text-xs font-bold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="h-px w-full bg-surface-container" />

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">
                    Fare ({selectedSeats.length}{" "}
                    {selectedSeats.length === 1 ? "seat" : "seats"})
                  </span>
                  <span className="font-bold">
                    ₦{(bus.price * selectedSeats.length).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Service Fee</span>
                  <span className="font-bold">
                    ₦{(3500 * selectedSeats.length).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low p-4 md:p-6">
                <div className="flex items-end justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-outline uppercase">
                    Total Price
                  </span>
                  <span className="font-headline text-2xl font-black text-primary md:text-3xl">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={handleConfirm}
                className="signature-gradient flex w-full items-center justify-center gap-3 rounded-xl py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 md:py-5"
              >
                Proceed to Payment
                <ArrowRight size={20} />
              </button>
              <p className="text-center text-[10px] leading-relaxed text-outline">
                By proceeding, you agree to EaseUp's{" "}
                <span className="underline">Terms of Service</span> and{" "}
                <span className="underline">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatSelectionPage
