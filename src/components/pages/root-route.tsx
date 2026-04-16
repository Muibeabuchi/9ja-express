import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Outlet, useLocation } from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"

export function RootRoute() {
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith("/auth")

  return (
    <>
      <div className="flex min-h-screen max-w-full flex-col overflow-x-hidden bg-background">
        {!isAuthRoute && <Navbar />}
        <main className="max-w-full grow overflow-x-hidden">
          <Outlet />
        </main>
        {!isAuthRoute && <Footer />}
      </div>
      <Toaster />
    </>
  )
}
