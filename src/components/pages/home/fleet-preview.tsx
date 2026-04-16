import { Link } from "@tanstack/react-router"
import { ArrowRight, Snowflake, UserRound, Wifi } from "lucide-react"
import { motion } from "motion/react"

import { data as mockData } from "@/data/mockData"

import {
  sectionFadeUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from "./home-motion"
import { SectionShell } from "./section-shell"

const highlightedFleetIds = ["ch-2", "ch-1", "ch-11"]

const specIcons = {
  legroom: UserRound,
  ac: Snowflake,
  wifi: Wifi,
}

const comfortSpecs: Record<
  string,
  { label: string; value: string; icon: keyof typeof specIcons }[]
> = {
  "Toyota Sienna": [
    { label: "Legroom", value: "Executive lounge spacing", icon: "legroom" },
    { label: "AC", value: "Dual-zone climate comfort", icon: "ac" },
    { label: "WiFi", value: "On-demand hotspot ready", icon: "wifi" },
  ],
  "Toyota Hiace (Hummer)": [
    { label: "Legroom", value: "Spacious commuter layout", icon: "legroom" },
    { label: "AC", value: "Cabin-wide cooling", icon: "ac" },
    { label: "WiFi", value: "Device-friendly onboard setup", icon: "wifi" },
  ],
  "Yutong Intercity Coach": [
    { label: "Legroom", value: "Long-haul recliner spacing", icon: "legroom" },
    { label: "AC", value: "Coach-class air circulation", icon: "ac" },
    { label: "WiFi", value: "Premium route connectivity", icon: "wifi" },
  ],
}

const fleetItems = (mockData.charterFleet || []).filter((vehicle) =>
  highlightedFleetIds.includes(vehicle.id)
)

export function FleetPreview() {
  return (
    <SectionShell
      eyebrow="Our vehicles"
      title="A fleet you can trust."
      description="Travel in comfort. Our fleet features modern coaches with AC, WiFi, and spacious seating for a premium journey."
      action={
        <Link
          to="/hire-fleet"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-all hover:gap-3 hover:border-slate-400"
        >
          Explore full fleet <ArrowRight size={16} />
        </Link>
      }
      className="bg-[linear-gradient(180deg,transparent_0%,rgba(15,28,45,0.05)_100%)]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid max-w-full grid-cols-1 gap-6 xl:grid-cols-3"
      >
        {fleetItems.map((vehicle) => {
          const specs = comfortSpecs[vehicle.model] ?? []

          return (
            <motion.article
              key={vehicle.id}
              variants={sectionFadeUp}
              transition={sectionTransition}
              className="group soft-elevation flex max-w-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={vehicle.imageURL}
                  alt={vehicle.model}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,17,29,0)_0%,rgba(9,17,29,0.55)_100%)]" />
                <div className="glass absolute top-4 left-4 rounded-full px-3 py-1.5 font-label text-[0.68rem] font-bold tracking-[0.18em] text-white uppercase">
                  {vehicle.type}
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-2 text-xs font-bold tracking-[0.18em] text-slate-900 uppercase">
                  {vehicle.capacity} seats
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-2xl font-extrabold tracking-tight text-slate-950">
                      {vehicle.model}
                    </h3>
                    <p className="mt-2 text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                      From N{vehicle.baseRatePerDay.toLocaleString()} / day
                    </p>
                  </div>
                  <div className="rounded-full bg-[color:rgb(212_165_74_/_0.12)] px-3 py-1 text-[0.72rem] font-bold text-[color:var(--golden-hour)]">
                    Comfort specs
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {specs.map((spec) => {
                    const Icon = specIcons[spec.icon]

                    return (
                      <div
                        key={spec.label}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--deep-midnight)] text-[color:var(--golden-hour-soft)]">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-[0.68rem] font-extrabold tracking-[0.18em] text-slate-500 uppercase">
                            {spec.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
                  {vehicle.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}
