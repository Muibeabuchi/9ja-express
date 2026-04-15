import { ChevronDown, Star, Bus, Info } from "lucide-react"
import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { data as mockData } from "../../data/mockData"
import { Route } from "@/routes/search-results"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

const BUS_TYPES = ["Executive Coach", "Smart Coach", "Blazer"]
const DEPARTURE_TIME_PERIODS = [
  { id: "early-morning", label: "Early Morning", start: 5, end: 12 },
  { id: "afternoon", label: "Afternoon", start: 12, end: 17 },
  { id: "night", label: "Night", start: 17, end: 5 },
]
const SORT_OPTIONS = [
  { id: "earliest", label: "Earliest First" },
  { id: "price-asc", label: "Price: Lowest to Highest" },
  { id: "price-desc", label: "Price: Highest to Lowest" },
]

const getTimePeriod = (time: string): string => {
  const hour = parseInt(time.split(":")[0], 10)
  if (hour >= 5 && hour < 12) return "early-morning"
  if (hour >= 12 && hour < 17) return "afternoon"
  return "night"
}

const SearchResultsPage = () => {
  const { from, to, departureDate } = Route.useSearch()
  const navigate = useNavigate()

  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000])
  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("earliest")

  const priceBounds = useMemo(() => {
    const filtered = mockData.buses.filter(
      (bus) => (!from || bus.from === from) && (!to || bus.to === to)
    )
    if (filtered.length === 0) return { min: 0, max: 150000 }
    const prices = filtered.map((b) => b.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [from, to])

  const filteredBuses = useMemo(() => {
    let result = mockData.buses.filter(
      (bus) => (!from || bus.from === from) && (!to || bus.to === to)
    )

    if (selectedBusTypes.length > 0) {
      result = result.filter((bus) => selectedBusTypes.includes(bus.type))
    }

    result = result.filter(
      (bus) => bus.price >= priceRange[0] && bus.price <= priceRange[1]
    )

    if (selectedDepartureTimes.length > 0) {
      result = result.filter((bus) =>
        selectedDepartureTimes.includes(getTimePeriod(bus.departureTime))
      )
    }

    const sorted = [...result]
    switch (sortOption) {
      case "earliest":
        sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
        break
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
    }

    return sorted
  }, [from, to, selectedBusTypes, priceRange, selectedDepartureTimes, sortOption])

  const toggleBusType = (type: string) => {
    setSelectedBusTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleDepartureTime = (period: string) => {
    setSelectedDepartureTimes((prev) =>
      prev.includes(period) ? prev.filter((t) => t !== period) : [...prev, period]
    )
  }

  const currentSortLabel = SORT_OPTIONS.find((o) => o.id === sortOption)?.label || "Sort"

  const handleSelectBus = (busId: string) => {
    navigate({
      to: "/seats",
      search: { busId, departureDate: departureDate ?? "" },
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
        {/* Filters */}
        <aside className="w-full shrink-0 lg:w-80">
          <div className="space-y-8 rounded-xl bg-surface-container-low p-6 md:space-y-10 md:p-8 lg:sticky lg:top-28">
            <div>
              <h3 className="mb-6 font-headline text-xl font-bold">Filters</h3>
              <div className="space-y-6 md:space-y-8">
                <section>
                  <label className="mb-4 block text-[10px] font-bold tracking-[0.05em] text-outline uppercase">
                    Bus Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUS_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleBusType(type)}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                          selectedBusTypes.includes(type)
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-[10px] font-bold tracking-[0.05em] text-outline uppercase">
                      Price Range
                    </label>
                    <span className="text-xs font-bold text-primary">
                      ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={1000}
                    className="py-2"
                  />
                </section>

                <section>
                  <label className="mb-4 block text-[10px] font-bold tracking-[0.05em] text-outline uppercase">
                    Departure Time
                  </label>
                  <div className="space-y-3 md:space-y-4">
                    {DEPARTURE_TIME_PERIODS.map((period) => (
                      <div key={period.id} className="flex items-center gap-3">
                        <Checkbox
                          id={period.id}
                          checked={selectedDepartureTimes.includes(period.id)}
                          onCheckedChange={() => toggleDepartureTime(period.id)}
                        />
                        <Label
                          htmlFor={period.id}
                          className="cursor-pointer text-sm font-medium text-on-surface-variant"
                        >
                          {period.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="grow space-y-6 md:space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
            <div>
              <h2 className="font-headline text-2xl font-extrabold tracking-tight md:text-3xl">
                {from || "Anywhere"} to {to || "Anywhere"}
              </h2>
              <p className="mt-1 text-sm font-medium text-outline">
                {filteredBuses.length} buses available •{" "}
                {departureDate || "All dates"}
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-surface-container-low px-4 py-2 md:px-6 md:py-3">
              <span className="text-[10px] font-bold tracking-wider text-outline uppercase">
                Sort by:
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-xs font-bold text-primary md:text-sm">
                    {currentSortLabel} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group ambient-shadow rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 transition-all duration-300 hover:bg-surface-container-low md:p-8"
              >
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-12">
                  <div className="w-full md:w-48">
                    <h4 className="mb-2 font-headline text-lg leading-tight font-bold">
                      {bus.name}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                        {bus.type}
                      </span>
                      <div className="text-tertiary flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">{bus.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full grow items-center justify-between gap-4 px-0 md:gap-6 md:px-8">
                    <div className="text-center">
                      <span className="block font-headline text-xl font-extrabold md:text-2xl">
                        {bus.departureTime}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest text-outline uppercase md:text-[10px]">
                        {bus.from}
                      </span>
                    </div>
                    <div className="flex grow flex-col items-center">
                      <span className="mb-1 text-[10px] font-bold text-outline md:mb-2 md:text-[11px]">
                        {bus.duration}
                      </span>
                      <div className="relative h-[2px] w-full bg-outline-variant">
                        <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-primary" />
                        <div className="absolute -top-1 right-0 h-2 w-2 rounded-full border-2 border-primary bg-white" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-2 md:px-3">
                          <Bus
                            size={14}
                            className="text-outline md:h-4 md:w-4"
                          />
                        </div>
                      </div>
                      <span className="mt-1 text-[9px] font-bold tracking-tighter text-primary-container uppercase md:mt-2 md:text-[10px]">
                        Direct Trip
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block font-headline text-xl font-extrabold md:text-2xl">
                        {bus.arrivalTime}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest text-outline uppercase md:text-[10px]">
                        {bus.to}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full min-w-[160px] flex-col items-end gap-4 text-right md:w-auto">
                    <div>
                      <span className="font-headline text-2xl font-black text-on-surface">
                        ₦{bus.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelectBus(bus.id)}
                      className="signature-gradient w-full rounded-lg px-8 py-3 text-sm font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] md:w-auto"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredBuses.length === 0 && (
              <div className="rounded-xl bg-surface-container-low py-20 text-center">
                <Info className="mx-auto mb-4 text-outline" size={48} />
                <h3 className="font-headline text-xl font-bold text-on-surface">
                  No buses found
                </h3>
                <p className="mt-2 text-on-surface-variant">
                  Try adjusting your search filters or locations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage
