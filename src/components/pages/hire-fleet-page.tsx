import { useMediaQuery } from "@/hooks/use-media-query"
import { parseVehicles, stringifyVehicles } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { differenceInDays, format } from "date-fns"
import {
  //  Route,
  ArrowRight,
  Sheet,
} from "lucide-react"
import { useState, useMemo } from "react"
import FleetCatalog from "../hire-fleet/fleet-catalog"
import HireFleetSummaryButton from "../hire-fleet/hire-fleet-summary-button"
import HireFleetSummaryContent from "../hire-fleet/hire-fleet-summary-content"
import { MobileDrawer } from "../mobile-drawer"
import { DrawerTitle } from "../ui/drawer"
import { SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import { data as mockData } from "@/data/mockData"

export function HireFleetPage() {
  const search = useSearch({ from: "/hire-fleet" })
  const navigate = useNavigate({ from: "/hire-fleet" })

  const [driverAccomodation, setDriverAccomodation] = useState(true)

  const selectedVehicles = parseVehicles(search.vehicles)
  const hasVehicles = Object.values(selectedVehicles).some((count) => count > 0)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const updateVehicles = (id: string, delta: number) => {
    const vehicle = mockData.charterFleet?.find((v) => v.id === id)
    if (!vehicle) return

    const currentCount = selectedVehicles[id] || 0
    let newCount = currentCount + delta

    if (newCount < 0) newCount = 0
    if (newCount > vehicle.availableQuantity)
      newCount = vehicle.availableQuantity

    const newSelection = { ...selectedVehicles }
    if (newCount === 0) {
      delete newSelection[id]
    } else {
      newSelection[id] = newCount
    }

    navigate({
      search: {
        ...search,
        vehicles: stringifyVehicles(newSelection) || undefined,
      },
      replace: true,
      resetScroll: false,
    })
  }

  const totalDays = useMemo(() => {
    if (!search.start || !search.end) return 1
    const start = new Date(search.start)
    const end = new Date(search.end)
    // Avoid NaNs if dates are invalid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1
    const diff = differenceInDays(end, start)
    return Math.max(1, diff + 1)
  }, [search.start, search.end])

  const totals = useMemo(() => {
    let baseCost = 0
    const surcharges = mockData.globalSurcharges || {
      residencePickupFee: 0,
      driverAccommodationPerNight: 0,
      retainBusDailyFee: 0,
    }

    Object.entries(selectedVehicles).forEach(([id, count]) => {
      const vehicle = mockData.charterFleet?.find((v) => v.id === id)
      if (vehicle) {
        baseCost += vehicle.baseRatePerDay * count * totalDays
      }
    })

    const residenceSurcharge =
      search.originType === "residence" && hasVehicles
        ? surcharges.residencePickupFee
        : 0
    const retainTotal = hasVehicles
      ? surcharges.retainBusDailyFee * totalDays
      : 0
    const nights = Math.max(0, totalDays - 1)
    const driverAccomodationFee =
      driverAccomodation && hasVehicles
        ? surcharges.driverAccommodationPerNight * nights
        : 0

    const subtotal =
      baseCost + residenceSurcharge + retainTotal + driverAccomodationFee

    return {
      baseCost,
      residenceSurcharge,
      retainTotal,
      driverAccomodationFee,
      nights,
      subtotal,
    }
  }, [
    selectedVehicles,
    totalDays,
    search.originType,
    driverAccomodation,
    hasVehicles,
  ])

  const SelectedCount = Object.values(selectedVehicles).reduce(
    (a, b) => a + b,
    0
  )

  return (
    <div className="min-h-screen bg-surface-container-lowest pb-24">
      {/* Header Info */}
      <div className="border-b border-outline-variant/20 bg-surface-container-low py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="mb-2 font-headline text-3xl font-black tracking-tight text-on-surface md:text-4xl">
                Select your fleet
              </h1>
              <p className="flex items-center gap-2 text-on-surface-variant">
                <span className="font-semibold text-on-surface">
                  {search.origin || "Pickup"}
                </span>
                <ArrowRight size={14} className="opacity-50" />
                <span className="font-semibold text-on-surface">
                  {search.destination || "Destination"}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-on-surface-variant">
                <div className="flex items-center gap-2 rounded-full bg-surface-container-highest px-3 py-1.5 shadow-sm">
                  Pickup:{" "}
                  {search.originType === "residence" ? "Residence" : "Terminal"}
                </div>
                {search.start && (
                  <div className="flex items-center gap-2 rounded-full bg-surface-container-highest px-3 py-1.5 shadow-sm">
                    {format(new Date(search.start), "MMM do")}
                    {search.end &&
                      search.end !== search.start &&
                      ` - ${format(new Date(search.end), "MMM do")}`}
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-full bg-surface-container-highest px-3 py-1.5 shadow-sm">
                  {totalDays} {totalDays === 1 ? "Day" : "Days"} Trip
                </div>
              </div>
            </div>

            {/* Live Summary Sheet target */}
            {isDesktop ? (
              <Sheet>
                <SheetTrigger>
                  <HireFleetSummaryButton SelectedCount={SelectedCount} />
                </SheetTrigger>
                <SheetContent className="flex h-full w-[600px] max-w-2xl! flex-col border-l border-outline-variant/20 bg-surface-container-lowest p-0 outline-none">
                  <HireFleetSummaryContent
                    totals={totals}
                    hasVehicles={hasVehicles}
                    SelectedCount={SelectedCount}
                    selectedVehicles={selectedVehicles}
                    updateVehicles={updateVehicles}
                    driverAccomodation={driverAccomodation}
                    setDriverAccomodation={setDriverAccomodation}
                    totalDays={totalDays}
                    origin={search.origin || "Origin"}
                    destination={search.destination || "Destination"}
                    // search={search}
                    title={
                      <SheetTitle className="font-headline text-2xl font-black tracking-tight">
                        Live Summary
                      </SheetTitle>
                    }
                  />
                </SheetContent>
              </Sheet>
            ) : (
              <MobileDrawer
                triggerButton={
                  <HireFleetSummaryButton SelectedCount={SelectedCount} />
                }
              >
                <HireFleetSummaryContent
                  totals={totals}
                  hasVehicles={hasVehicles}
                  SelectedCount={SelectedCount}
                  selectedVehicles={selectedVehicles}
                  updateVehicles={updateVehicles}
                  driverAccomodation={driverAccomodation}
                  setDriverAccomodation={setDriverAccomodation}
                  totalDays={totalDays}
                  origin={search.origin || "Origin"}
                  destination={search.destination || "Destination"}
                  // search={search}
                  title={
                    <DrawerTitle className="font-headline text-2xl font-black tracking-tight">
                      Live Summary
                    </DrawerTitle>
                  }
                />
              </MobileDrawer>
            )}
          </div>
        </div>
      </div>

      {/* Fleet Catalog */}
      <FleetCatalog
        selectedVehicles={selectedVehicles}
        updateVehicles={updateVehicles}
      />
    </div>
  )
}
