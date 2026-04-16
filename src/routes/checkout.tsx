import CheckoutPage from "@/components/pages/checkout-page"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"

const checkoutSearchSchema = z.object({
  busId: z.string().catch(""),
  seatNumbers: z.array(z.number()).catch([]),
  departureDate: z.string().catch(""),
})

export const Route = createFileRoute("/checkout")({
  validateSearch: checkoutSearchSchema,
  component: CheckoutPage,
  beforeLoad: () => {
    const session = sessionStorage.getItem("pmt_session")
    if (!session) {
      const currentSearch = window.location.search
      sessionStorage.setItem(
        "pmt_auth_redirect",
        JSON.stringify({
          to: "/checkout",
          search: currentSearch,
        })
      )
      throw redirect({ to: "/auth/sign-in" })
    }
  },
})
