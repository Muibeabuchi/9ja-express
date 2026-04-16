import { createFileRoute } from "@tanstack/react-router"
import { SignUpPage } from "@/components/pages/sign-up-page"

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpPage,
})