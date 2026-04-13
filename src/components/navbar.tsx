import { Link, useNavigate } from "@tanstack/react-router"
import { Bell, User } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="glass ambient-shadow sticky inset-x-0 top-0 z-50 mx-auto w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20">
        <div className="flex w-full items-center justify-between gap-6 md:gap-12">
          <Link to="/">
            <img
              src="/9JA-Express-logo.svg"
              alt="9JA Express Logo"
              className="cursor-pointer font-headline font-extrabold tracking-tighter"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors hover:text-primary`}
            >
              Trips
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Manage Booking
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Offers
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Support
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-on-surface-variant transition-colors hover:text-primary">
              <Bell size={20} />
            </button>
            <button className="text-on-surface-variant transition-colors hover:text-primary">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
