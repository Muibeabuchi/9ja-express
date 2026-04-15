import { HireCheckoutPage } from "@/components/pages/hire-checkout-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const hireCheckoutSchema = z.object({
  vehicles: z.string().optional(),
  totals: z.string().optional(),
  totalDays: z.number().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  originType: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})

export const Route = createFileRoute("/hire-checkout")({
  validateSearch: hireCheckoutSchema,
  component: HireCheckoutPage,
})
