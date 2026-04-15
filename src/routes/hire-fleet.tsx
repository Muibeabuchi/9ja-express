import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { HireFleetPage } from "@/components/pages/hire-fleet-page"

const hireSearchSchema = z.object({
  mode: z.string().optional(),
  originType: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  vehicles: z.string().optional(),
})

export const Route = createFileRoute("/hire-fleet")({
  validateSearch: (search) => hireSearchSchema.parse(search),
  component: HireFleetPage,
})
