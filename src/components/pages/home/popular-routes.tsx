import { ArrowUpRight, MapPin } from "lucide-react"
import { motion } from "motion/react"

import {
  sectionFadeUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from "./home-motion"
import { SectionShell } from "./section-shell"

const routes = [
  {
    city: "Lagos",
    route: "Commercial capital departures",
    price: "Starting from N18,500",
    image:
      "https://media.gettyimages.com/id/494453644/photo/commercial-offices-stand-on-the-city-skyline-beside-the-ogun-river-in-lagos-nigeria-on-monday.jpg?s=612x612&w=0&k=20&c=KxcrkgNHEP2sYLkGRxf5-Yxx_S8OJYw1XdHPJyrn3Ug=",
  },
  {
    city: "Abuja",
    route: "Capital city connections",
    price: "Starting from N25,000",
    image:
      "https://media.gettyimages.com/id/489337940/photo/central-bank-of-nigeria-headquarters-in-abuja.jpg?s=612x612&w=0&k=20&c=GLQgFljXVppTOQlPwC1l82Wc67ZsL1toi9Qrqgyt9ug=",
  },
  {
    city: "Port Harcourt",
    route: "Coastal business corridor",
    price: "Starting from N21,500",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
]

export function PopularRoutes() {
  return (
    <SectionShell
      eyebrow="Destinations"
      title="Curated corridors that keep Nigeria moving."
      description="A destination gallery built around contrast, motion, and strong hierarchy so route discovery feels premium rather than utilitarian."
      className="bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.84)_32%,transparent_100%)]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid max-w-full grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {routes.map((item, index) => (
          <motion.article
            key={item.city}
            variants={sectionFadeUp}
            transition={{ ...sectionTransition, delay: index * 0.04 }}
            className="group midnight-panel golden-ring relative min-h-[420px] max-w-full overflow-hidden rounded-[2rem]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.city}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,27,0.08)_0%,rgba(6,16,27,0.24)_38%,rgba(6,16,27,0.88)_100%)]" />
            <div className="absolute -bottom-16 left-6 rounded-full border border-white/12 bg-white/10 px-4 py-2 font-label text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-md transition-all duration-500 group-hover:bottom-70">
              {item.price}
            </div>

            <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase">
                  <MapPin
                    size={14}
                    className="text-[color:var(--golden-hour-soft)]"
                  />
                  Featured stop
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/20 text-white transition-transform duration-300 group-hover:-translate-y-1">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-[0.16em] text-white/68 uppercase">
                  {item.route}
                </p>
                <h3 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {item.city}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/74">
                  Direct booking pathways, dependable departures, and premium
                  travel comfort engineered around this route.
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
