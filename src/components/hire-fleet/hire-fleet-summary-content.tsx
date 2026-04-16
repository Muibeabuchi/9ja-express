import { ArrowRight, Bus, Minus, Plus, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"
import { data as mockData } from "@/data/mockData"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useAuthStore } from "@/stores/auth-store"

type Props = {
  title: ReactNode
  totals: Totals
  updateVehicles: (id: string, delta: number) => void
  selectedVehicles: Record<string, number>
  driverAccomodation: boolean
  hasVehicles: boolean
  setDriverAccomodation: (value: boolean) => void
  totalDays: number
  origin: string
  destination: string
  SelectedCount: number
}

type Totals = {
  baseCost: number
  residenceSurcharge: number
  retainTotal: number
  driverAccomodationFee: number
  nights: number
  subtotal: number
}

export default function HireFleetSummaryContent({
  totals,
  driverAccomodation,
  setDriverAccomodation,
  SelectedCount,
  selectedVehicles,
  hasVehicles,
  updateVehicles,
  title,
  destination,
  origin,
  totalDays,
}: Props) {
  const navigate = useNavigate()
  const search = useSearch({ from: "/hire-fleet" })
  const { user } = useAuthStore()
  const handleNavigate = () => {
    if (!user) {
      sessionStorage.setItem(
        "pmt_auth_redirect",
        JSON.stringify({
          to: "/hire-checkout",
          search: {
            vehicles: JSON.stringify(selectedVehicles),
            totals: JSON.stringify(totals),
            totalDays,
            origin,
            destination,
            originType: search.originType,
            start: search.start,
            end: search.end,
          },
        })
      )
      navigate({ to: "/auth/sign-in" })
      return
    }
    navigate({
      to: "/hire-checkout",
      search: {
        vehicles: JSON.stringify(selectedVehicles),
        totals: JSON.stringify(totals),
        totalDays,
        origin,
        destination,
        originType: search.originType,
        start: search.start,
        end: search.end,
      },
    })
  }
  return (
    <>
      <div className="w-full border-b border-outline-variant/20 bg-surface-container-low/50 p-6">
        {title}

        <p className="mt-1 text-xs text-on-surface-variant">
          {totalDays} Days Charter • {origin || "Origin"} to{" "}
          {destination || "Destination"}
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {SelectedCount === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
            <Bus size={48} className="mb-4 text-outline" />
            <h3 className="mb-1 text-lg font-bold">No buses selected</h3>
            <p className="text-sm">
              Add buses from the fleet list to see your breakdown.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest text-outline uppercase">
                Selected Vehicles
              </h4>
              {Object.entries(selectedVehicles)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, count]) => count > 0)
                .map(([id, count]) => {
                  const v = mockData.charterFleet?.find((x) => x.id === id)
                  if (!v) return null
                  return (
                    <div
                      key={id}
                      className="flex items-start justify-between gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/30 p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container-high">
                          <img
                            src={v.imageURL}
                            alt={v.model}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="mb-0.5 max-w-[120px] truncate text-sm leading-tight font-bold">
                            {v.model}
                          </p>
                          <p className="text-xs font-medium text-on-surface-variant">
                            {count}x @ ₦{v.baseRatePerDay.toLocaleString()}/day
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-high p-1">
                        <button
                          onClick={() => updateVehicles(id, -1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-surface-container-highest active:scale-95"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="w-4 text-center text-xs font-bold">
                          {count}
                        </span>
                        <button
                          disabled={count >= v.availableQuantity}
                          onClick={() => updateVehicles(id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-surface-container-highest active:scale-95 disabled:opacity-50"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest text-outline uppercase">
                Add-ons & Surcharges
              </h4>
              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/30 p-4 transition-colors hover:bg-surface-container-low/50">
                <input
                  type="checkbox"
                  checked={driverAccomodation}
                  onChange={(e) => setDriverAccomodation(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-outline-variant text-primary"
                />
                <div className="flex-1">
                  <p className="mb-1 text-sm leading-tight font-bold">
                    Driver Accommodation
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    We handle our driver's lodging. Uncheck if you will provide
                    accommodation.
                  </p>
                </div>
              </label>

              <div className="flex gap-3 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4 text-xs text-on-surface-variant shadow-sm">
                <ShieldCheck size={16} className="shrink-0 text-primary" />
                <p>
                  Includes mandatory retainment fee of ₦
                  {(
                    mockData.globalSurcharges?.retainBusDailyFee || 0
                  ).toLocaleString()}
                  /day for continuous access.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_-20px_20px_-15px_rgba(0,0,0,0.05)]">
        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
              Base Rate ({totalDays} Days)
            </span>
            <span className="font-bold text-on-surface">
              ₦{totals.baseCost.toLocaleString()}
            </span>
          </div>
          {totals.residenceSurcharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                Residence Pickup
              </span>
              <span className="font-bold text-on-surface">
                ₦{totals.residenceSurcharge.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
              Retain Fee ({totalDays} Days)
            </span>
            <span className="font-bold text-on-surface">
              ₦{totals.retainTotal.toLocaleString()}
            </span>
          </div>
          {totals.nights > 0 && driverAccomodation && hasVehicles && (
            <div className="flex justify-between text-sm text-primary">
              <span className="text-xs font-bold tracking-widest uppercase">
                Driver Lodging ({totals.nights} Nights)
              </span>
              <span className="font-bold">
                ₦{totals.driverAccomodationFee.toLocaleString()}
              </span>
            </div>
          )}

          <div className="mt-2 flex items-end justify-between border-t border-outline-variant/20 pt-4">
            <div>
              <p className="mb-0.5 text-[10px] font-bold tracking-widest text-outline uppercase">
                Estimated Total
              </p>
              <p className="font-headline text-3xl leading-none font-black tracking-tight text-on-surface">
                ₦{totals.subtotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={SelectedCount === 0}
          onClick={handleNavigate}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-on-surface py-4.5 text-sm font-black tracking-widest text-surface uppercase shadow-xl shadow-on-surface/20 transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          Proceed to Details
          <ArrowRight size={18} />
        </button>
      </div>
    </>
  )
}
