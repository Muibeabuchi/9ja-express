import { SignUpPage } from "@/components/pages/sign-up-page"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
  beforeLoad: () => {
    const session = sessionStorage.getItem("pmt_session")
    if (session) {
      throw redirect({ to: "/" })
    }
  },
})
