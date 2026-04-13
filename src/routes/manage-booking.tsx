import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import ManageBookingPage from "@/components/pages/manage-booking-page"

const manageBookingSchema = z.object({
  ref: z.string().catch(""),
})

export const Route = createFileRoute("/manage-booking")({
  validateSearch: manageBookingSchema,
  component: ManageBookingPage,
})
