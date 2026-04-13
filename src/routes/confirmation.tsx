import ConfirmationPage from "@/components/pages/confirmation-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const confirmationSearchSchema = z.object({
  busId: z.string().catch(""),
  seatNumbers: z.array(z.number()).catch([]),
  fullName: z.string().catch(""),
  email: z.string().catch(""),
  phone: z.string().catch(""),
})

export const Route = createFileRoute("/confirmation")({
  validateSearch: confirmationSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return <ConfirmationPage />
}
