import {
  BadgeCheck,
  MapPinned,
  RefreshCcw,
  Snowflake,
} from "lucide-react"
import { motion } from "motion/react"

import {
  sectionFadeUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from "./home-motion"
import { SectionShell } from "./section-shell"

const features = [
  {
    title: "Real-time tracking",
    description:
      "Monitor every departure with live status signals, terminal visibility, and journey updates that stay one step ahead.",
    icon: MapPinned,
    accent: "from-amber-400/25 via-amber-300/10 to-transparent",
    size: "lg:col-span-7",
  },
  {
    title: "Professional drivers",
    description:
      "Carefully vetted crews, monitored trips, and route discipline designed for calm, secure travel.",
    icon: BadgeCheck,
    accent: "from-sky-400/25 via-sky-300/10 to-transparent",
    size: "lg:col-span-5",
  },
  {
    title: "Climate control",
    description:
      "Every cabin is tuned for long-haul comfort with cool circulation, quiet interiors, and premium seating flow.",
    icon: Snowflake,
    accent: "from-cyan-400/25 via-cyan-300/10 to-transparent",
    size: "lg:col-span-5",
  },
  {
    title: "Seamless refunds",
    description:
      "Resolve schedule changes faster with transparent refund pathways and support designed around traveler confidence.",
    icon: RefreshCcw,
    accent: "from-orange-400/25 via-orange-300/10 to-transparent",
    size: "lg:col-span-7",
  },
]

export function FeaturesGrid() {
  return (
    <SectionShell
      eyebrow="Why travel with us"
      title="Operational excellence, packaged as a premium travel experience."
      description="The homepage now shifts from static marketing blocks to high-trust service signals, using the same cinematic language introduced in the hero."
      className="bg-transparent"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid max-w-full grid-cols-1 gap-5 lg:grid-cols-12"
      >
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <motion.article
              key={feature.title}
              variants={sectionFadeUp}
              transition={sectionTransition}
              className={`group relative max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white p-7 soft-elevation ${feature.size}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:rgb(212_165_74_/_0.25)] bg-[color:rgb(9_17_29_/_0.88)] text-[color:var(--golden-hour-soft)] shadow-[0_0_28px_rgba(212,165,74,0.22)]">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-label text-[0.68rem] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Always on
                  </span>
                </div>

                <div className="max-w-xl">
                  <h3 className="font-headline text-2xl font-extrabold tracking-tight text-slate-950 md:text-[2rem]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}
