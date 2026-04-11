import DestinationCard from "@/components/destination-card"
import SearchWidget from "@/components/search-widget"
import Navbar from "@/components/navbar"

import { createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Zap, Armchair, ShieldCheck, Send } from "lucide-react"
import { motion } from "motion/react"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-40">
          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-8 max-w-4xl font-headline text-[3.5rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-on-surface md:text-[5rem]"
            >
              Redefining the{" "}
              <span className="text-primary italic">Kinetic</span> Journey.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant"
            >
              Experience seamless bus transit booking with architectural
              precision. Premium seats, real-time tracking, and effortless
              arrivals.
            </motion.p>
          </div>

          {/* Background Accents */}
          <div className="absolute top-0 right-0 -z-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute -bottom-24 -left-24 -z-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        </section>

        <SearchWidget />

        {/* Featured Destinations */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <span className="mb-3 block font-label text-[10px] font-bold tracking-[0.15em] text-primary uppercase">
                Premium Routes
              </span>
              <h2 className="font-headline text-4xl font-bold text-on-surface">
                Explore the Grid.
              </h2>
            </div>
            <button className="group flex items-center gap-2 font-bold text-primary transition-all hover:gap-4">
              View All Destinations <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <DestinationCard
              large
              title="New York City Central"
              subtitle="Daily Route"
              price="$45.00"
              image="https://picsum.photos/seed/nyc/1200/800"
            />
            <DestinationCard
              title="Toronto District"
              subtitle="Urban Express"
              image="https://picsum.photos/seed/toronto/800/600"
            />
            <DestinationCard
              title="San Francisco West"
              subtitle="Coastal Line"
              image="https://picsum.photos/seed/sf/800/600"
            />
          </div>
        </section>

        {/* Value Props */}
        <section className="bg-surface-container-low px-6 py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
            <div className="space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap size={28} fill="currentColor" />
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">
                Rapid Boarding
              </h4>
              <p className="leading-relaxed text-on-surface-variant">
                Skip the terminal queues. Our digital check-in system gets you
                on board in under 60 seconds using purely biometric or QR
                verification.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Armchair size={28} fill="currentColor" />
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">
                Kinetic Comfort
              </h4>
              <p className="leading-relaxed text-on-surface-variant">
                Ergonomic seating designed for the modern professional. Every
                bus features high-speed satellite WiFi and climate-controlled
                micro-zones.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck size={28} fill="currentColor" />
              </div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">
                Safety by Design
              </h4>
              <p className="leading-relaxed text-on-surface-variant">
                Real-time telemetry and AI-assisted driving protocols ensure
                that your safety is never a variable, but a constant in our
                equation.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-container bg-surface-container-low px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <div className="font-headline text-2xl font-extrabold tracking-tighter text-on-surface">
                EaseUp
              </div>
              <p className="leading-relaxed text-on-surface-variant">
                The next evolution in regional transit. Precision-engineered
                travel for the global citizen.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
                Company
              </h5>
              <nav className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  Carrier Partners
                </a>
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  Mobile App
                </a>
              </nav>
            </div>

            <div className="space-y-6">
              <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
                Support
              </h5>
              <nav className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-on-surface-variant transition-colors hover:text-primary"
                >
                  Help Center
                </a>
              </nav>
            </div>

            <div className="space-y-6">
              <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
                Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow rounded-md border-none bg-surface-container-highest px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                />
                <button className="rounded-md bg-primary p-3 text-on-primary transition-opacity hover:opacity-90">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-surface-container pt-12 md:flex-row">
            <p className="text-sm text-outline">
              © 2024 EaseUp Kinetic Transit. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-xs font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-xs font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-xs font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
