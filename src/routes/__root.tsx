import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import {
  createRootRoute,
  //  Link,
  Outlet,
} from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = () => (
  <>
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
    <Toaster />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
