import { HireCheckoutPage } from "@/components/pages/hire-checkout-page"
import { createFileRoute, redirect } from "@tanstack/react-router"
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
  beforeLoad: () => {
    const session = sessionStorage.getItem("pmt_session")
    if (!session) {
      const currentSearch = window.location.search
      sessionStorage.setItem(
        "pmt_auth_redirect",
        JSON.stringify({
          to: "/hire-checkout",
          search: currentSearch,
        })
      )
      throw redirect({ to: "/sign-in" })
    }
  },
})
