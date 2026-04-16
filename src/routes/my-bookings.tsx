import {
  createFileRoute,
  //  redirect
} from "@tanstack/react-router"
import MyBookingsPage from "@/components/pages/booking/my-bookings-page"

export const Route = createFileRoute("/my-bookings")({
  // beforeLoad: () => {
  //   const session = sessionStorage.getItem("pmt_session")
  //   console.log(session)
  //   if (!session) {
  //     const currentSearch = window.location.search
  //     sessionStorage.setItem(
  //       "pmt_auth_redirect",
  //       JSON.stringify({
  //         to: "/checkout",
  //         search: currentSearch,
  //       })
  //     )
  //     throw redirect({
  //       to: "/auth/sign-in",
  //       search: { redirect: "/my-bookings" },
  //     })
  //   }
  // },
  component: MyBookingsPage,
})
