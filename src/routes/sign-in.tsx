import { createFileRoute, redirect } from "@tanstack/react-router"
import { SignInPage } from "@/components/pages/sign-in-page"

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
  beforeLoad: () => {
    const session = sessionStorage.getItem("pmt_session")
    if (session) {
      throw redirect({ to: "/" })
    }
  },
})
