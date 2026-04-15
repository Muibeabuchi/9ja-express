import {
  Clock3,
  ShieldCheck,
  Star,
} from "lucide-react"
import { motion } from "motion/react"

import { FeaturesGrid } from "./home/features-grid"
import { FleetPreview } from "./home/fleet-preview"
import { PopularRoutes } from "./home/popular-routes"
import { ProcessFlow } from "./home/process-flow"
import SearchWidget from "../search-widget"

const heroStats = [
  "Daily departures across major Nigerian routes",
  "Professional drivers and monitored trips",
  "Premium coaches built for long-haul comfort",
]

const HomePage = () => (
  <>
    <section className="relative isolate min-h-[760px] max-w-full overflow-hidden bg-[#0b1520] pt-22 text-white sm:min-h-[840px] md:min-h-[920px]">
      <motion.div
        initial={{ scale: 1, opacity: 0.88 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80"
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
          className="absolute bottom-32 left-4 rounded-2xl border border-white/12 bg-white/12 px-4 py-3 shadow-2xl backdrop-blur-md sm:left-6 md:bottom-40 md:left-8"
        >
          <div className="text-[0.65rem] font-bold tracking-[0.2em] text-white/70 uppercase">
            Active travelers
          </div>
          <div className="mt-1 text-lg font-extrabold text-white">
            50k+ travelers this month
          </div>
        </motion.div>
      </div>

      <div className="relative z-30 -mt-28 md:-mt-36">
        <SearchWidget heroMode />
      </div>
    </section>

    {/* LEGACY SECTIONS - COMMENTED OUT FOR NEW DESIGN SYSTEM INTEGRATION
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block font-label text-[10px] font-bold tracking-[0.15em] text-primary uppercase md:mb-3">
            Premium Routes
          </span>
          <h2 className="font-headline text-3xl font-bold text-on-surface md:text-4xl">
            Explore the Grid.
          </h2>
        </div>
        <button className="group flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4 md:text-base">
          View All Destinations <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <DestinationCard
          large
          title="Lagos to Abuja"
          subtitle="Daily Route"
          price="₦25,000"
          image="https://picsum.photos/seed/lagos/1200/800"
        />
        <DestinationCard
          title="Enugu Express"
          subtitle="Urban Express"
          image="https://picsum.photos/seed/enugu/800/600"
        />
        <DestinationCard
          title="Port Harcourt Coastal"
          subtitle="Coastal Line"
          image="https://picsum.photos/seed/ph/800/600"
        />
      </div>
    </section>

    <section className="bg-surface-container-low px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
        <div className="space-y-4 md:space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-14 md:w-14">
            <Zap size={24} className="md:h-7 md:w-7" fill="currentColor" />
          </div>
          <h4 className="font-headline text-xl font-bold text-on-surface md:text-2xl">
            Rapid Boarding
          </h4>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
            Skip the terminal queues. Our digital check-in system gets you on
            board in under 60 seconds using purely biometric or QR verification.
          </p>
        </div>
        <div className="space-y-4 md:space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-14 md:w-14">
            <Armchair size={24} className="md:h-7 md:w-7" fill="currentColor" />
          </div>
          <h4 className="font-headline text-xl font-bold text-on-surface md:text-2xl">
            Kinetic Comfort
          </h4>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
            Ergonomic seating designed for the modern professional. Every bus
            features high-speed satellite WiFi and climate-controlled
            micro-zones.
          </p>
        </div>
        <div className="space-y-4 md:space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-14 md:w-14">
            <ShieldCheck
              size={24}
              className="md:h-7 md:w-7"
              fill="currentColor"
            />
          </div>
          <h4 className="font-headline text-xl font-bold text-on-surface md:text-2xl">
            Safety by Design
          </h4>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
            Real-time telemetry and AI-assisted driving protocols ensure that
            your safety is never a variable, but a constant in our equation.
          </p>
        </div>
      </div>
    </section>
    */}

    <FeaturesGrid />
    <PopularRoutes />
    <ProcessFlow />
    <FleetPreview />
  </>
)

export default HomePage
