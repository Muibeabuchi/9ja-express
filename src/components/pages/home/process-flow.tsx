import { ArrowRight, BusFront, Search, Ticket } from "lucide-react"
import { motion } from "motion/react"

import {
  sectionFadeUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from "./home-motion"
import { SectionShell } from "./section-shell"

const steps = [
  {
    title: "Search",
    description:
      "Set your route, travel date, and preferred trip mode in seconds.",
    icon: Search,
  },
  {
    title: "Select",
    description:
      "Choose the right schedule and seat with transparent details and pricing.",
    icon: Ticket,
  },
  {
    title: "Go",
    description:
      "Arrive with confidence and board a monitored, comfort-first journey.",
    icon: BusFront,
  },
]

export function ProcessFlow() {
  return (
    <SectionShell
      eyebrow="How it works"
      title="A frictionless flow from planning to departure."
      description="Booking your bus is simple. Find your route, choose your seat, and you're ready to go."
      centered
      className="py-10 md:py-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="soft-elevation relative max-w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-6 py-10 md:px-10 md:py-12"
      >
        <div className="absolute top-1/2 right-12 left-12 hidden h-px -translate-y-1/2 lg:block" />
        <motion.div
          initial={{ scaleX: 0, opacity: 0.5 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={sectionViewport}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="b absolute top-1/2 right-12 left-12 hidden h-px origin-left lg:block"
        />

        <div className="grid max-w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.title}
                variants={sectionFadeUp}
                transition={{ ...sectionTransition, delay: index * 0.06 }}
                className="relative flex max-w-full flex-col items-start rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-6 text-left lg:min-h-[250px]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--deep-midnight)] text-[color:var(--golden-hour-soft)] shadow-[0_18px_34px_rgba(9,17,29,0.2)]">
                  <Icon size={24} />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-label text-[0.72rem] font-extrabold tracking-[0.22em] text-primary uppercase">
                    0{index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <ArrowRight
                      size={15}
                      className="text-slate-400 lg:hidden"
                    />
                  ) : null}
                </div>
                <h3 className="font-headline text-2xl font-extrabold tracking-tight text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </SectionShell>
  )
}
