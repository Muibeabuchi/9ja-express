import SeatSelectionPage from "@/components/pages/seat-selection-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const seatsSearchSchema = z.object({
  busId: z.string().catch(""),
})

export const Route = createFileRoute("/seats")({
  validateSearch: seatsSearchSchema,
  component: SeatSelectionPage,
})
