import { Check, ChevronDown, Star, Bus, Info } from "lucide-react"
import { motion } from "motion/react"
import { useMemo } from "react"
import { useNavigate } from "@tanstack/react-router"
import { data as mockData } from "../../data/mockData"
import { Route } from "@/routes/search-results"

const SearchResultsPage = () => {
  const { from, to, departureDate } = Route.useSearch()
  const navigate = useNavigate()

  const filteredBuses = useMemo(
    () =>
      mockData.buses.filter(
        (bus) => (!from || bus.from === from) && (!to || bus.to === to)
      ),
    [from, to]
  )

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
                    <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-on-primary">
                      AC
                    </button>
                    <button className="hover:bg-surface-variant rounded-full bg-surface-container-highest px-4 py-2 text-xs font-bold text-on-surface-variant transition-colors">
                      Non-AC
                    </button>
                    <button className="hover:bg-surface-variant rounded-full bg-surface-container-highest px-4 py-2 text-xs font-bold text-on-surface-variant transition-colors">
                      Sleeper
                    </button>
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-[10px] font-bold tracking-[0.05em] text-outline uppercase">
                      Price Range
                    </label>
                    <span className="text-xs font-bold text-primary">
                      ₦5k - ₦50k
                    </span>
                  </div>
                  <input
                    type="range"
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-outline-variant accent-primary"
                  />
                </section>

                <section>
                  <label className="mb-4 block text-[10px] font-bold tracking-[0.05em] text-outline uppercase">
                    Departure Time
                  </label>
                  <div className="space-y-3 md:space-y-4">
                    {["Early Morning", "Afternoon", "Night"].map((time) => (
                      <label
                        key={time}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded border border-outline-variant transition-colors group-hover:border-primary">
                          <Check
                            size={14}
                            className="hidden text-primary group-hover:block"
                          />
                        </div>
                        <span className="text-sm font-medium text-on-surface-variant">
                          {time}
                        </span>
                      </label>
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
              <div className="flex cursor-pointer items-center gap-2 text-xs font-bold text-primary md:text-sm">
                Earliest First <ChevronDown size={16} />
              </div>
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
