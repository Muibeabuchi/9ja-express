import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import {
  createRootRoute,
  //  Link,
  Outlet,
} from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen max-w-full flex-col overflow-x-hidden bg-background">
        <Navbar />
        <main className="grow max-w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  ),
})
