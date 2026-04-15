export const sectionViewport = { once: true, amount: 0.2 }

export const sectionTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
}

export const sectionFadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}
