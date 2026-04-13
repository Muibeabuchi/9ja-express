import SearchResultsPage from "@/components/pages/search-results-page"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const searchParamsSchema = z.object({
  from: z.string().catch(""),
  to: z.string().catch(""),
  departureDate: z.string().catch(""),
  returnDate: z.string().optional().catch(""),
  tripType: z.enum(["one-way", "round-trip", "hire"]).catch("one-way"),
})

export const Route = createFileRoute("/search-results")({
  validateSearch: searchParamsSchema,
  component: SearchResultsPage,
})
