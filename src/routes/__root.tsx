import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import {
  createRootRoute,
  //  Link,
  Outlet,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

const RootLayout = () => (
  <>
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
