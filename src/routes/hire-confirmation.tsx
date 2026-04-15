import { HireConfirmationPage } from "@/components/pages/hire-confirmation-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const hireConfirmationSchema = z.object({
  bookingRef: z.string().optional(),
  fullName: z.string().optional(),
  vehicles: z.string().optional(),
  totals: z.string().optional(),
  totalDays: z.number().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})

export const Route = createFileRoute("/hire-confirmation")({
  validateSearch: hireConfirmationSchema,
  component: HireConfirmationPage,
})
