import { Link } from "@tanstack/react-router"
import { Bell, Menu, User } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Trips", to: "/" },
  { label: "Manage Booking", to: "/manage-booking" },
  { label: "Offers", to: "/" },
  { label: "Support", to: "/" },
]

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky inset-x-0 top-0 z-50"
    >
      <nav
        className={cn(
          "mx-auto w-full transition-all duration-500",
          // scrolled

          // ?
          "border-b border-white/10 bg-slate-950/40 backdrop-blur-md"
          // : "border-b border-transparent bg-transparent"
        )}
      >
        {/* bg-white/10 */}
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20">
          <div className="flex w-full items-center justify-between gap-6 md:gap-12">
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative flex size-21 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300">
                {/* <span className="font-body text-sm font-black tracking-[0.22em] text-white">
                  9JA
                </span> */}
                <img src="/9JA-Express-logo.svg" alt="9JA Express logo" />
              </div>
              <div className="hidden sm:block">
                <div className="font-body text-sm font-black tracking-[0.28em] text-white uppercase drop-shadow-[0_0_18px_rgba(255,255,255,0.22)]">
                  9JA Express
                </div>
                <div className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/58 uppercase">
                  Trusted road journeys
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group relative text-sm font-semibold tracking-[0.08em] text-white/82 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/7 text-white/78 transition-all duration-300 hover:border-white/25 hover:bg-white/12 hover:text-white">
                <Bell size={18} />
              </button>
              <button className="hidden h-10 items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 text-sm font-semibold text-white/82 transition-all duration-300 hover:border-white/25 hover:bg-white/12 hover:text-white sm:flex">
                <User size={16} />
                Account
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/7 text-white/82 transition-all duration-300 hover:border-white/25 hover:bg-white/12 hover:text-white md:hidden">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
