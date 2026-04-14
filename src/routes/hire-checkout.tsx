import { HireCheckoutPage } from "@/components/pages/hire-checkout-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/hire-checkout")({
  component: RouteComponent,
})

function RouteComponent() {
  return <HireCheckoutPage />
}
