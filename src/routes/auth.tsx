import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    const session = sessionStorage.getItem("pmt_session")
    if (session) {
      throw redirect({ to: "/" })
    }
  },
  component: () => (
    <>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Outlet />
      </div>
      <Toaster />
    </>
  ),
})