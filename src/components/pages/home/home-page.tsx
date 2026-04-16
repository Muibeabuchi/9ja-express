import { Clock3, ShieldCheck, Star } from "lucide-react"
import { motion } from "motion/react"

import { FeaturesGrid } from "./features-grid"
import { FleetPreview } from "./fleet-preview"
import { PopularRoutes } from "./popular-routes"
import { ProcessFlow } from "./process-flow"
import SearchWidget from "../../search-widget"

const heroStats = [
  "Daily departures across major Nigerian routes",
  "Professional drivers and monitored trips",
  "Premium coaches built for long-haul comfort",
]

const HomePage = () => (
  <>
    <section className="relative isolate min-h-[760px] max-w-full overflow-hidden bg-[#0b1520] pt-8 text-white sm:min-h-[840px] md:min-h-[920px] md:pt-18">
      <motion.div
        initial={{ scale: 1, opacity: 0.88 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/pmt-hero-image.avif"
          alt="Luxury coach bus traveling on a scenic highway"
          className="h-full w-full object-cover object-[72%_center] md:object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.62)_28%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,156,56,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(17,87,168,0.22),transparent_28%)]" />
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" /> */}

      <div className="relative mx-auto flex min-h-[260px] max-w-7xl items-center px-4 pt-12 pb-48 sm:px-6 sm:pb-52 md:min-h-[420px] md:pb-56">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <Star size={14} className="fill-[#f5c86a] text-[#f5c86a]" />
            <span className="font-label text-[0.7rem] font-bold tracking-[0.24em] text-white/90 uppercase">
              Trust and movement, built for every mile
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl font-body text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Your Trusted Partner for the Road Ahead.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-2xl font-body text-base leading-7 text-white/82 sm:text-lg md:text-xl"
          >
            Experience the future of inter-state travel with Nigeria&apos;s most
            reliable fleet. Book your seat in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 grid gap-3 sm:max-w-2xl sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm"
              >
                <span className="text-sm leading-6 text-white/88">{stat}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-wrap items-center gap-4 text-white/86"
          >
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md">
              <ShieldCheck size={18} className="text-[#f5c86a]" />
              <span className="text-sm font-semibold">
                Fleet reliability with monitored safety protocols
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md">
              <Clock3 size={18} className="text-[#f5c86a]" />
              <span className="text-sm font-semibold">
                Fast booking for urgent and planned departures
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-28 left-4 rounded-2xl border border-white/12 bg-white/12 px-4 py-3 shadow-2xl backdrop-blur-md sm:left-6 md:bottom-36 md:left-8"
        >
          <div className="text-[0.65rem] font-bold tracking-[0.2em] text-white/70 uppercase">
            Active travelers
          </div>
          <div className="mt-1 text-lg font-extrabold text-white">
            50k+ travelers this month
          </div>
        </motion.div>
      </div>

      <div className="relative z-30 -mt-24 md:-mt-30">
        <SearchWidget heroMode />
      </div>
    </section>
    <FeaturesGrid />
    <PopularRoutes />
    <ProcessFlow />
    <FleetPreview />
  </>
)

export default HomePage
