import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { TanStackDevtools } from "@tanstack/react-devtools"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools"
import { RouterProvider, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"

import "./index.css"

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultStructuralSharing: true,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />

      <TanStackDevtools
        config={{ position: "bottom-left", hideUntilHover: true }}
        plugins={[
          formDevtoolsPlugin(),
          // {
          //   name: "Tantack Router",
          //   render: <TanStackRouterDevtools />,
          // },
          // {
          //   name: "Tantack Form",
          //   render: <FormDevtoolsPanel />,
          // },
        ]}
      />
    </StrictMode>
  )
}
