import { ArrowRight, Zap, Armchair, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import DestinationCard from "../destination-card"
import SearchWidget from "../search-widget"

const HomePage = () => (
  <>
    <section className="relative mx-auto flex min-h-[500px] max-w-7xl items-center overflow-hidden px-4 pt-20 pb-40 sm:px-6 md:min-h-[400px]">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 max-w-4xl font-headline text-[3.5rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-on-surface md:text-[5rem]"
        >
          Redefining the <span className="text-primary italic">Kinetic</span>{" "}
          Journey.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant"
        >
          Experience seamless bus transit booking with architectural precision.
          Premium seats, real-time tracking, and effortless arrivals.
        </motion.p>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 z-0 h-full w-1/3 bg-linear-to-l from-primary/5 to-transparent" />
      <div className="absolute -bottom-24 -left-24 z-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
    </section>

    <SearchWidget />

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
  </>
)

export default HomePage
