import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hire-confirmation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/hire-confirmation"!</div>
}
