import ConfirmationPage from "@/components/pages/confirmation-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const confirmationSearchSchema = z.object({
  bookingRef: z.string().catch(""),
  departureDate: z.string().catch(""),
})

export const Route = createFileRoute("/confirmation")({
  validateSearch: confirmationSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return <ConfirmationPage />
}
