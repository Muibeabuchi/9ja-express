import CheckoutPage from "@/components/pages/checkout-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const checkoutSearchSchema = z.object({
  busId: z.string().catch(""),
  seatNumbers: z.array(z.number()).catch([]),
  departureDate: z.string().catch(""),
})

export const Route = createFileRoute("/checkout")({
  validateSearch: checkoutSearchSchema,
  component: CheckoutPage,
})
