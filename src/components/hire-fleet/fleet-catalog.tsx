import { data as mockData } from "@/data/mockData"
import { cn } from "@/lib/utils"
import { Minus, Plus, ShieldCheck, Users } from "lucide-react"

type Props = {
  selectedVehicles: Record<string, number>
  updateVehicles: (id: string, delta: number) => void
}

export default function FleetCatalog({
  selectedVehicles,
  updateVehicles,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {mockData.charterFleet?.map((vehicle) => {
          const count = selectedVehicles[vehicle.id] || 0
          const isSelected = count > 0

          return (
            <div
              key={vehicle.id}
              className={cn(
                "group flex flex-col overflow-hidden rounded-3xl border-2 transition-all duration-300",
                isSelected
                  ? "border-primary bg-surface-container-lowest shadow-[0_20px_40px_-15px_rgba(0,40,200,0.1)]"
                  : "border-outline-variant/20 bg-surface-container-lowest hover:-translate-y-1 hover:border-outline hover:shadow-xl"
              )}
            >
              <div className="relative h-56 shrink-0 overflow-hidden bg-surface-container-low md:h-64">
                <img
                  src={vehicle.imageURL}
                  alt={vehicle.model}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-surface/90 px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-md">
                  <Users size={12} className="text-primary" />
                  {vehicle.capacity} Seats
                </div>
                <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-surface/90 px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-md">
                  {vehicle.type}
                </div>
                {vehicle.availableQuantity <= 2 && (
                  <div className="bg-error text-error-container absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-md">
                    Only {vehicle.availableQuantity} Left
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="mb-5">
                  <h3 className="mb-1 font-headline text-2xl font-black tracking-tight">
                    {vehicle.model}
                  </h3>
                  <p className="font-headline text-2xl font-black text-primary lg:text-3xl">
                    ₦{vehicle.baseRatePerDay.toLocaleString()}
                    <span className="ml-1 text-sm font-bold tracking-normal text-on-surface-variant">
                      / day
                    </span>
                  </p>
                </div>

                <div className="mb-8 flex-1">
                  <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-outline uppercase">
                    <ShieldCheck size={12} /> Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center rounded-lg border border-outline-variant/20 bg-surface-container-low px-2.5 py-1.5 text-[11px] font-bold text-on-surface-variant shadow-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto border-t border-outline-variant/20 pt-6">
                  {isSelected ? (
                    <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/10 p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] md:p-2.5">
                      <button
                        onClick={() => updateVehicles(vehicle.id, -1)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface shadow-sm transition-all hover:bg-white active:scale-95"
                      >
                        <Minus strokeWidth={3} size={18} />
                      </button>
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-headline text-2xl leading-none font-black text-primary">
                          {count}
                        </span>
                        <span className="mt-1 text-[9px] font-bold tracking-widest text-primary/70 uppercase">
                          Selected
                        </span>
                      </div>
                      <button
                        disabled={count >= vehicle.availableQuantity}
                        onClick={() => updateVehicles(vehicle.id, 1)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-on-primary shadow-md transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                      >
                        <Plus strokeWidth={3} size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateVehicles(vehicle.id, 1)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-surface-container-highest py-4.5 text-sm font-black tracking-widest text-on-surface uppercase transition-all hover:bg-primary hover:text-on-primary hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                    >
                      <Plus size={18} strokeWidth={2.5} /> Add to Hire
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
